import Joi from '@hapi/joi';

export const userSchema = Joi.object({
    login: Joi
        .string()
        .alphanum()
        .min(3)
        .max(50)
        .required(),

    password: Joi
        .string()
        .pattern(new RegExp(/(?=.*[A-Za-z])(?=.*\d)[0-9A-Za-z]{6,}/))
        .required(),

    age: Joi
        .number()
        .min(4)
        .max(130)
});
