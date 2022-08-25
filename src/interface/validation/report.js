const Joi = require("joi");

const createReportSchema = Joi.object({
  reportedId: Joi.string()
    .min(24)
    .max(24)
    .required()
    .error(new Error("reportedId is not correct")),
  type: Joi.string()
    .valid("spam", "fake account", "violence", "pornography", "other")
    .required()
    .error(new Error("report type is not correct")),
  description: Joi.string()
    .required()
    .error(new Error("description is not correct")),
});

const reportIdSchema = Joi.object({
  reporterId: Joi.string()
    .min(24)
    .max(24)
    .required()
    .error(new Error("reporterId is not correct")),
});

const reportId = Joi.object({
  id: Joi.string()
    .min(24)
    .max(24)
    .required()
    .error(new Error("reportId is not correct")),
});

const listReportSchema = Joi.object({
  page: Joi.number().min(1).max(50).error(new Error("page is not correct")),
  limit: Joi.number().min(2).max(20).error(new Error("limit is not correct")),
  sortBy: Joi.string()
    .valid("count:asc", "count:desc", "updatedAt:asc", "updatedAt:desc")
    .error(new Error("sort type is not correct")),
});

module.exports = {
  createReportSchema,
  reportIdSchema,
  reportId,
  listReportSchema,
};
