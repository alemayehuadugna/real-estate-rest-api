const Joi = require("joi");


const createFeedbackSchema = Joi.object({
    message: Joi.string().required().error(new Error('write something')),
    userId: Joi.string().min(24).max(24).required().error(new Error('userId is not correct')),
    name: Joi.string().pattern(new RegExp('^[a-zA-Z]+$')).required().error(new Error('incorrect name'))
});

const feedbackIdSchema = Joi.object({
    id: Joi.string().min(24).max(24).required().error(new Error('Id is not correct'))
});

const listFeedbackSchema = Joi.object({
    page: Joi.number().min(1).max(50).error(new Error('page is not correct')),
    limit: Joi.number().min(2).max(20).error(new Error('limit is not correct')),  
});


module.exports = {
    createFeedbackSchema,
    feedbackIdSchema, 
    listFeedbackSchema
};