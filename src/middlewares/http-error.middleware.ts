import {Request, Response} from 'express';
import {HttpException} from "../components";

export const httpError = () => (err: HttpException, _: Request, res: Response) => {
    const {status = 500, message} = err;

    console.error(message);
    res.status(status).json({status, message});
};
