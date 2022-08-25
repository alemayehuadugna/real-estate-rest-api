'use strict';

const TodoListController = require('../controllers/TodoListController');
const { createTodoListSchema, idSchema, deleteIdSchema, updateTodoListTaskSchema, todoListIdSchema, DoneSchema, CountSchema } = require('../validation/todoList');

module.exports = {
    name: 'todoLists',
    version: '1.0.0',
    register: async (server) =>{

        server.route([
            {
                method: 'POST',
                path: '/employees/{id}/todoLists',
                config: {
                    cors: {
                        origin: ['*'],
                        additionalHeaders: ['cache-control', 'x-requested-with']
                    },
                    validate: { 
                        params: idSchema,
                        payload:  createTodoListSchema
                     },
                    handler: TodoListController.createTodoList,
                    description: 'Create a TodoList',
                    tags: ['api'],
                },
            },

            {
                method: 'DELETE',
                path: '/employees/{userId}/todoLists/{id}',
                config: {
                    cors: {
                        origin: ['*'],
                        additionalHeaders: ['cache-control', 'x-requested-with']
                    },
                    // validate: {
                    //     params: deleteIdSchema,
                    //     payload: updateTodoListTaskSchema
                    // },
                    handler: TodoListController.deleteTodoList,
                    description: 'Delete a TodoList',
                    tags: ['api'],
                },
            },
            {
                method: 'PATCH',
                path: '/employees/{userId}/UpdateTodoLists/{id}',
                config: {
                    cors: {
                        origin: ['*'],
                        additionalHeaders: ['cache-control', 'x-requested-with']
                    },
                    validate: {
                        params: deleteIdSchema,
                        payload: updateTodoListTaskSchema
                    },
                    handler: TodoListController.updateTodoList,
                    description: 'Update a TodoList',
                    tags: ['api'],
                },
            },
            {
                method: 'GET',
                path: '/employees/{id}/todoLists',
                config: {
                    cors: {
                        origin: ['*'],
                        additionalHeaders: ['cache-control', 'x-requested-with']
                    },
                    validate: { params: todoListIdSchema },
                    handler: TodoListController.findTodoLists,
                    description: 'List All Users TodoLists',
                    tags: ['api'],
                },
            },
            {
                method: 'PATCH',
                path: '/employees/completed/{id}', 
                config: {
                    cors: {
                        origin: ['*'],
                        additionalHeaders: ['cache-control', 'x-requested-with']
                    },
                    validate: { 
                        params: todoListIdSchema,
                        payload: DoneSchema
                    },
                    handler: TodoListController.updateCompleted,
                    description: 'Update Done',
                    tags: ['api']
                },  
            },
            {
                method: 'DELETE',
                path: '/employees/completed',
                config: {
                    cors: {
                        origin: ['*'],
                        additionalHeaders: ['cache-control', 'x-requested-with']
                    },
                    description: 'Delete Completed Todos',
                    tags: ['api'],
                    handler: TodoListController.deleteCompleted
                }, 
            },
            {
                method: 'PATCH',
                path: '/employees/toggleAll',
                config: {
                    cors: {
                        origin: ['*'],
                        additionalHeaders: ['cache-control', 'x-requested-with']
                    },
                    validate: { payload: CountSchema },
                    handler: TodoListController.toggleAll,
                    description: 'Toggle All',
                    tags: ['api'],
                },
            },
        ]);
    }
}