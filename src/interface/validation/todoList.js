const Joi = require("joi");

const createTodoListSchema = Joi.object({
    task: Joi.string().required().error(new Error('task is null'))
});

const idSchema = Joi.object({
    id: Joi.string().min(24).max(24).required().error(new Error('todoListId is not correct')),
});


const deleteIdSchema = Joi.object({
    userId: Joi.string().min(24).max(24).required().error(new Error('userId is not correct')),
    id: Joi.string().min(24).max(24).required().error(new Error('todoListId is not correct')),
});

const updateTodoListTaskSchema = Joi.object({
    oldTask: Joi.string().error(new Error('oldTask is required')),
    newTask: Joi.string().required().error(new Error('newTask is required'))
});

const todoListIdSchema = Joi.object({
    id: Joi.string().min(24).max(24).required().error(new Error('todoListId is not correct')),
});

const DoneSchema = Joi.object({
    done: Joi.boolean().required().error(new Error('done is not correct')),
});

const CountSchema = Joi.object({
    count: Joi.number().min(0).required().error(new Error('count is not correct'))
})

module.exports = {
    createTodoListSchema,
    idSchema,
    deleteIdSchema,
    updateTodoListTaskSchema, 
    todoListIdSchema,
    DoneSchema, 
    CountSchema
}