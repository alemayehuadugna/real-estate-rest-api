const Joi = require("joi");

const createMessageSchema = Joi.object({
    conversationId: Joi.string().min(24).max(24).required().error(new Error('conversationId is not correct')),
    senderId: Joi.string().min(24).max(24).required().error(new Error('senderId is not correct')),
    message: Joi.string().required().error(new Error('message is empty'))
});

const updateMessageSchema = Joi.object({
    message: Joi.string().required().error(new Error('message is empty'))
});

const messageIdSchema = Joi.object({
    id: Joi.string().min(24).max(24).required().error(new Error('messageId is not correct'))
});

const listMessageSchema = Joi.object({
    page: Joi.number().min(1).max(50).error(new Error('page is not correct')),
    pagination: Joi.number().min(2).max(20).error(new Error('pagination is not correct')),  
});

module.exports = {
    createMessageSchema,
    updateMessageSchema,
    messageIdSchema,
    listMessageSchema
};