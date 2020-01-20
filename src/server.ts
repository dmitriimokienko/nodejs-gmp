import express, {Application} from 'express';
import cors from 'cors';
import {config} from './config';
import {userRouter} from './modules/user';
import {dbConnect} from "../resources/db.connection.properties";

export const app: Application = express();

app.use(cors());
app.use(express.json());
app.use('/api', [userRouter]);

// add error handler

app.listen(config.port, () => {
    dbConnect();
    console.log(`Application running on http://${config.host}:${config.port}`);
});
