import {Schema} from '@hapi/joi';
import {NextFunction, Request, Response} from 'express';
import createError from 'http-errors';
import {get} from 'lodash';

type Validation = {
    error?: Error,
    value: Object
}

export const validateSchema = (schema: Schema) => (req: Request, _res: Response, next: NextFunction): void => {
    const config = {abortEarly: false, allowUnknown: false};
    const validation: Validation = schema.validate(req.body, config);

    if (validation.error) {
        const message = get(validation, 'error.message');
        const error = createError(400, message);

        next(error);
    } else {
        next();
    }
};
