import Boom from '@hapi/boom';
import { Request, Response, NextFunction } from 'express';

export const methodNotAllowed = (_req: Request, _res: Response, next: NextFunction) => {
    next(Boom.methodNotAllowed('Method is not allowed'));
};
