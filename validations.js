const Joi = require('@hapi/joi');

const registrationSchema = Joi.object({
    name: Joi.string().required().min(2),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8)
});

const loginSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8)
});

module.exports.registrationSchema = registrationSchema;
module.exports.loginSchema = loginSchema;