const Joi = require("joi");

const createPropertyReviewSchema = Joi.object({
    userId: Joi.string().min(24).max(24).required().error(new Error('userId is not correct')),
    comment: Joi.string().required().error(new Error('give your comment')),
    rating: Joi.number().min(1).max(5).error(new Error('invalid rating'))
});

const updatePropertyReviewSchema = Joi.object({
    comment: Joi.string().required().error(new Error('give your comment')),
    rating: Joi.number().min(1).max(5).error(new Error('invalid rating'))
});

const IdSchema = Joi.object({
    id: Joi.string().min(24).max(24).required().error(new Error('reviewId is not correct')),
    propertyId: Joi.string().min(24).max(24).required().error(new Error('propertyId is not correct')),
});

const propertyIdSchema = Joi.object({
    propertyId: Joi.string().min(24).max(24).required().error(new Error('propertyId is not correct')),
});

const reviewIdSchema = Joi.object({
    id: Joi.string().min(24).max(24).required().error(new Error('reviewId is not correct')),   
});


const propertyReviewSchema = Joi.object({
    page: Joi.number().min(1).max(50).error(new Error('page is not correct')),
    pagination: Joi.number().min(2).max(20).error(new Error('pagination is not correct')),
});

module.exports = {
    createPropertyReviewSchema,
    updatePropertyReviewSchema,
    IdSchema,
    propertyReviewSchema,
    propertyIdSchema,
    reviewIdSchema
}


