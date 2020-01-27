import express, {Application} from 'express';
import cors from 'cors';
import {config} from './config';
import {userRouter} from './modules/user';
import {sequelize} from '../resources';
import {httpError} from './middlewares';

export const app: Application = express();

app.use(cors());
app.use(express.json());
app.use('/api', [userRouter]);
app.use(httpError());

sequelize.sync()
    .then(() => {
        app.listen(config.port, () => {
            console.log(`Application running on http://${config.host}:${config.port}`);
        });
    })
    .catch(
        e => console.log(e)
    );
