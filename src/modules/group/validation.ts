import Joi from '@hapi/joi';

export const groupValidation = Joi.object({
    id: Joi.string().guid({ version: 'uuidv4' }),

    name: Joi.string()
        .alphanum()
        .min(3)
        .max(50)
        .required(),

    permission: Joi.array().items(Joi.string().valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'))
});
