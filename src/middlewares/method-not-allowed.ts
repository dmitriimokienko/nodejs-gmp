import Boom from '@hapi/boom';
import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils';

export const methodNotAllowed = (_req: Request, _res: Response, next: NextFunction): void => {
    const err = Boom.methodNotAllowed('Method is not allowed');

    logger.error(err);
    next(err);
};
