import Boom from '@hapi/boom';
import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils';

export const notFound = (_req: Request, _res: Response, next: NextFunction): void => {
    const err = Boom.notFound('Invalid Request');

    logger.error(err);
    next(err);
};
