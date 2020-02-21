import express, { Application } from 'express';
import 'reflect-metadata';
import dotenv from 'dotenv';
import cors from 'cors';
import { sequelize } from '../resources';
import { httpError, notFound } from './middlewares';
import { initializeUserTable } from './modules/user';
import { initializeGroupTable } from './modules/group';
import { initializeUsersGroupsTable } from './modules/user-group';
import { logger } from './utils';
import { logUnhandledErrors, registerRouting } from './handlers';

dotenv.config();

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
        const { HOST, PORT } = process.env;
        app.listen(PORT, () => {
            logger.info(`Application running on http://${HOST}:${PORT}`);
        });
    })
    .catch((error: Error) => {
        logger.error(error);
    });
