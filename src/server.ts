import express from 'express';
import cors from 'cors';
import {config} from './config';
import {userRouter} from './modules/user';

export const app: express.Application = express();

app.use(cors());
app.use(express.json());
app.use('/api', [userRouter]);

app.listen(config.port, () => {
    console.log(`Application running on http://${config.host}:${config.port}`);
});
