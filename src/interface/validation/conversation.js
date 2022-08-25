const Joi = require("joi");

const newConversationSchema = Joi.object({
    members: Joi.array().items(Joi.string().min(24).max(24).required()).length(2),
});

const conversationIdSchema = Joi.object({
    id: Joi.string().min(24).max(24).required(),
});

const clearConversationSchema = Joi.object({
    conversationIds: Joi.array().items(Joi.string().min(24).max(24)).required(),
});

module.exports = {
    newConversationSchema,
    conversationIdSchema,
    clearConversationSchema
}