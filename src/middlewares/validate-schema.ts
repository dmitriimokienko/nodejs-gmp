import Boom from '@hapi/boom';
import { Schema } from '@hapi/joi';
import { NextFunction, Request, Response } from 'express';
import { logger } from '../utils';

type Validation = {
    error?: Error;
    value: { error: Error };
};

export const validateSchema = (schema: Schema) => (req: Request, _res: Response, next: NextFunction): void => {
    const config = { abortEarly: false, allowUnknown: false };
    const validation: Validation = schema.validate(req.body, config);

    if (validation.error) {
        const { message } = validation.error;
        const err = Boom.badRequest(message);

        logger.error(err);
        return next(err);
    }

    next();
};
