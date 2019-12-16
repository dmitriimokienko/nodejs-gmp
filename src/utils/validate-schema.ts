import Joi from '@hapi/joi';
import {NextFunction, Request, Response} from 'express';

// @ts-ignore
export const validateSchema = (schema: Joi.Schema) => (req: Request, res: Response, next: NextFunction) => {
    const config = {abortEarly: false, allowUnknown: false};
    const {error} = schema.validate(req.body, config);

    if (error) return res.status(400).json(error);
    next();
};
