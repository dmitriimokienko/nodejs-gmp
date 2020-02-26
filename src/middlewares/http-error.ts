import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../interfaces';
import { logger } from '../utils';

export const httpError = (err: HttpException, _req: Request, res: Response, next: NextFunction): void => {
    if (err.isBoom) {
        const { statusCode, payload } = err.output;
        res.status(statusCode).json(payload);
        logger.error(payload);
    } else {
        const { statusCode = 500, message } = err;
        res.status(statusCode).json({ statusCode, message });
        logger.error(message);
    }

    next(err);
};
