const Joi = require("joi");

const newBookingSchema = Joi.object({
    propertyId: Joi.string().min(24).max(24).required().error(new Error('propertyId is not processable')),
    userId: Joi.string().min(24).max(24).required().error(new Error('userId is not processable')),
    checkInDate:  Joi.date().iso().raw().min('now').required(),
    checkOutDate: Joi.date().iso().raw().min(Joi.ref('checkInDate')).required(),
});

const bookingIdSchema = Joi.object({
    id: Joi.string().min(24).max(24).required().error(new Error('id not processable')),
});

const bookingUpdateSchema = Joi.object({
    checkInDate:  Joi.date().iso().raw().min('now').required(),
    checkOutDate: Joi.date().iso().raw().min(Joi.ref('checkInDate')).required(),
});

module.exports = {
    newBookingSchema,
    bookingIdSchema,
    bookingUpdateSchema
}