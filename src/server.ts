import express, { Application } from 'express';
import 'reflect-metadata';
import cors from 'cors';
import container from './inversify.config';
import { sequelize } from '../resources';
import { config } from './config';
import { TYPES } from './types';
import { httpError } from './middlewares';
import { RegistrableController } from './interfaces';
import { initializeUserTable } from './modules/user';
import { initializeGroupTable } from './modules/group';

export const app: Application = express();

app.use(cors());
app.use(express.json());

const controllers: RegistrableController[] = container.getAll<RegistrableController>(TYPES.Controller);
controllers.forEach(controller => controller.register(app));

app.use(httpError());

sequelize
    .sync({ force: true })
    .then(initializeUserTable)
    .then(initializeGroupTable)
    .then(() => {
        app.listen(config.port, () => {
            console.log(`Application running on http://${config.host}:${config.port}`);
        });
    })
    .catch(e => console.log(e));
