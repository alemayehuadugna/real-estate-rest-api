const Joi = require("joi");

const paginationSchema = Joi.object({
    page: Joi.number().min(1).max(50).error(new Error("page is not correct")),
    limit: Joi.number().min(2).max(20).error(new Error('limit is not correct')),
});

module.exports = {
    paginationSchema
}