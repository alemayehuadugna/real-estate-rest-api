const Joi = require("joi");

const idSchema = Joi.object({
  id: Joi.string()
    .min(24)
    .max(24)
    .required()
    .error(new Error("Invalid id input")),
});

const subscribedPayloadSchema = Joi.object({
  title: Joi.string().required().error(new Error("incorrect title")),
  description: Joi.string()
    .required()
    .error(new Error("incorrect description")),
  notificationImage: Joi.any().error(new Error("incorrect image")),
  receiverId: Joi.alternatives().try(
    Joi.string()
      .min(24)
      .max(24)
      .required()
      .error(new Error("Invalid id input")),
    Joi.string().allow(null)
  ),
  notificationType: Joi.string()
    .valid("discipline", "admin", "announcement")
    .required()
    .error(new Error("incorrect role")),
});

const subscriberPayloadSchema = Joi.object({
  subscription: Joi.any(),
  title: Joi.string().required().error(new Error("incorrect title")),
  description: Joi.string()
    .required()
    .error(new Error("incorrect description")),
  notificationImage: Joi.any().error(new Error("incorrect image")),
  id: Joi.string()
    .min(24)
    .max(24)
    .required()
    .error(new Error("Invalid id input")),
  role: Joi.string()
    .valid("admin", "Admin", "Employee", "employee")
    .required()
    .error(new Error("incorrect role")),
});

const deletePayloadSchema = Joi.object({
  title: Joi.string().required().error(new Error("incorrect title")),
  description: Joi.string()
    .required()
    .error(new Error("incorrect description")),
  notificationImage: Joi.any().error(new Error("incorrect image")),
  
});

module.exports = {
  idSchema,
  subscribedPayloadSchema,
  subscriberPayloadSchema,
  deletePayloadSchema,
};
