import express, { Application } from 'express';
import 'reflect-metadata';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { httpError, notFound } from './middlewares';
import { logUnhandledErrors, registerRouting, runServer } from './handlers';

dotenv.config();

export const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

registerRouting(app);
app.use('/', notFound);

logUnhandledErrors();
app.use(httpError);

runServer(app);
