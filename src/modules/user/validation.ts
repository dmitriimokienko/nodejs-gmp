import Joi from '@hapi/joi';

export const userValidation = Joi.object({
    id: Joi.string().guid({ version: 'uuidv4' }),

    login: Joi.string()
        .alphanum()
        .min(3)
        .max(50)
        .required(),

    password: Joi.string()
        .pattern(new RegExp(/(?=.*[A-Za-z])(?=.*\d)[0-9A-Za-z]{6,}/))
        .required(),

    age: Joi.number()
        .integer()
        .min(4)
        .max(130),

    isDeleted: Joi.boolean()
});

export const userUpdateValidation = Joi.object({
    password: Joi.string().pattern(new RegExp(/(?=.*[A-Za-z])(?=.*\d)[0-9A-Za-z]{6,}/)),

    age: Joi.number()
        .integer()
        .min(4)
        .max(130)
});
