import Boom from '@hapi/boom';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';

export const checkToken = (req: Request, _res: Response, next: NextFunction): void => {
    const token = get(req, 'cookies.token');
    if (!token) {
        return next(Boom.unauthorized('Unauthorized'));
    }

    try {
        const { SECRET_KEY }: any = process.env;
        jwt.verify(token, SECRET_KEY);
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            return next(Boom.unauthorized('Unauthorized'));
        }
        return next(Boom.badRequest('Authorization error'));
    }
};
