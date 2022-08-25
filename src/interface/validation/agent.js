const Joi = require("joi");

const createAgentSchema = Joi.object({
    firstName: Joi.string().min(2).max(30).required().error(new Error('firstName is not correct')),
    lastName: Joi.string().min(2).max(30).required().error(new Error('lastName is not correct')),
    phone: Joi.string().pattern(new RegExp('^[0-9]{9,9}$')).required().error(new Error('phone number is not correct')),
    email: Joi.string().email().lowercase().required().error(new Error('email is not correct')),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).error(new Error('password is not correct')),
    profilePicture: Joi.string().error(new Error('profilePicture is not correct')),
});

const agentIdSchema = Joi.object({
    id: Joi.string().min(24).max(24).required().error(new Error('agentId is not correct')),
});

const updateAgentSchema = Joi.object({
    firstName: Joi.string().min(2).max(30).required().error(new Error('firstName is not correct')),
    lastName: Joi.string().min(2).max(30).required().error(new Error('lastName is not correct')),
    email: Joi.string().email().lowercase().required().error(new Error('email is not correct')),
    profilePicture: Joi.string().error(new Error('profilePicture is not correct')),
});

const updateAgentRatingSchema = Joi.object({
    rating: Joi.number().min(1).max(5).required().error(new Error('rating is not correct')),
});

module.exports = {
    createAgentSchema,
    agentIdSchema,
    updateAgentSchema,
    updateAgentRatingSchema
};