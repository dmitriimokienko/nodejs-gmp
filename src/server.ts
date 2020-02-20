import express, { Application } from 'express';
import 'reflect-metadata';
import cors from 'cors';
import container from './inversify.config';
import { sequelize } from '../resources';
import { config } from './config';
import { TYPES } from './types';
import { httpError, notFound } from './middlewares';
import { RegistrableController } from './interfaces';
import { initializeUserTable } from './modules/user';
import { initializeGroupTable } from './modules/group';
import { initializeUsersGroupsTable } from './modules/user-group';
import { logger } from './utils';

export const app: Application = express();

app.use(cors());
app.use(express.json());

const controllers: RegistrableController[] = container.getAll<RegistrableController>(TYPES.Controller);
controllers.forEach(controller => controller.register(app));

app.use('/', notFound);

process
    .on('unhandledRejection', (reason, promise) => {
        logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
    })
    .on('uncaughtException', (error: Error) => {
        logger.error(`Uncaught Exception thrown - ${error}`);
        process.exit(1);
    });

app.use(httpError);

sequelize
    .sync({ force: true })
    .then(initializeUserTable)
    .then(initializeGroupTable)
    .then(initializeUsersGroupsTable)
    .then(() => {
        app.listen(config.port, () => {
            logger.info(`Application running on http://${config.host}:${config.port}`);
        });
    })
    .catch((error: Error) => {
        logger.error(error);
    });
