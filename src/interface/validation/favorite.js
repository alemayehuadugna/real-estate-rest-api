const Joi = require("joi");

const createFavoriteSchema = Joi.object({
    propertyId: Joi.string().min(24).max(24).required().error(new Error('propertyId is not correct'))
});

const idSchema = Joi.object({
    id: Joi.string().min(24).max(24).required().error(new Error('userId is not correct'))
});

module.exports = {
    createFavoriteSchema,
    idSchema,
}