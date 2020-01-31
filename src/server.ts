import express, { Application } from 'express';
import cors from 'cors';
import { config } from './config';
import { userRouter, initializeUserTable } from './modules/user';
import { initializeGroupTable } from './modules/group';
import { sequelize } from '../resources';
import { httpError } from './middlewares';
import { RegistrableController } from './interfaces';
import container from './inversify.config';
import { TYPES } from './types';

export const app: Application = express();

app.use(cors());
app.use(express.json());
app.use('/api', [userRouter]);

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
