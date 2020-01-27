import express, {Application, Request, Response, NextFunction} from 'express';
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

app.use((_err: Error, _req: Request, res: Response, _next: NextFunction) => {
    res.status(500).send('Internal Server Error');
});

sequelize.sync()
    .then(() => {
        app.listen(config.port, () => {
            console.log(`Application running on http://${config.host}:${config.port}`);
        });
    })
    .catch(
        e => console.log(e)
    );
