import express, { Application } from 'express';
import 'reflect-metadata';
import cors from 'cors';
import { sequelize } from '../resources';
import { config } from './config';
import { httpError, notFound } from './middlewares';
import { initializeUserTable } from './modules/user';
import { initializeGroupTable } from './modules/group';
import { initializeUsersGroupsTable } from './modules/user-group';
import { logger } from './utils';
import { logUnhandledErrors, registerRouting } from './handlers';

export const app: Application = express();

app.use(cors());
app.use(express.json());

registerRouting(app);
app.use('/', notFound);

logUnhandledErrors();
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
