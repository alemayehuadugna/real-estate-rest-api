const Joi = require("joi");

const createLeadSchema = Joi.object({
    agentId: Joi.string().min(24).max(24).required().error(new Error('agentId is not correct')),
    userId: Joi.string().min(24).max(24).required().error(new Error('userId is not correct')),
    propertyId: Joi.string().min(24).max(24).required().error(new Error('propertyId is not correct')),
    type: Joi.string().valid("rent", "sale").required().error(new Error('type is not correct')),
    description: Joi.string().required().error(new Error('writing description is must'))
});

const updateLeadSchema = Joi.object({
    progress: Joi.string().valid("success", "failure").required().error(new Error('progress is not correct'))
});

const leadIdSchema = Joi.object({
    id: Joi.string().min(24).max(24).required().error(new Error('leadId is not correct')),
});

const listLeadSchema = Joi.object({
    page: Joi.number().min(1).max(50).error(new Error('page is not correct')),
    limit: Joi.number().min(2).max(20).error(new Error('limit is not correct')),
});
const phoneSchema = Joi.object({
    phone: Joi.string().pattern(new RegExp('^[0-9]{9,9}$')).error(new Error('phone number is not correct')),
});

module.exports = {
    createLeadSchema,
    updateLeadSchema, 
    leadIdSchema,
    listLeadSchema, 
    phoneSchema
};