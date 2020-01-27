import Boom from '@hapi/boom';
import { Request, Response, NextFunction } from 'express';

export const notFound = (_req: Request, _res: Response, next: NextFunction) => {
    next(Boom.notFound('Invalid Request'));
};
