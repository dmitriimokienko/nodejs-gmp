import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../components';

export const httpError = () => (err: HttpException, _req: Request, res: Response, next: NextFunction) => {
    if (err.isBoom) {
        const { statusCode, payload } = err.output;
        res.status(statusCode).json(payload);
    } else {
        const { statusCode = 500, message } = err;
        res.status(statusCode).json({ statusCode, message });
    }
    next(err);
};