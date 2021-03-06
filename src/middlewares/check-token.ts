import Boom from '@hapi/boom';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const checkToken = (req: Request, _res: Response, next: NextFunction): void => {
    const { token } = req;
    if (!token) {
        return next(Boom.unauthorized('Unauthorized user'));
    }

    try {
        const { SECRET_KEY }: any = process.env;
        jwt.verify(token, SECRET_KEY);
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            return next(Boom.forbidden('Invalid token'));
        }
        return next(Boom.badRequest(e));
    }

    next();
};
