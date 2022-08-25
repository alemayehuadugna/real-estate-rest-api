'use strict';

const UserController = require('../controllers/UserController');
const {createUserSchema, getUserSchema, updateUserSchema, changePasswordSchema, phoneSchema} = require('../validation/user');
const { paginationSchema } = require('../validation/PaginationValidator');

module.exports = {
    name: 'users',
    version: '1.0.0',
    register: async (server) => {

        server.route([
            {
                method: 'GET',
                path: '/users/{token}',
                config: {
                    cors: {
                        origin: ['*'],
                        additionalHeaders: ['cache-control', 'x-requested-with']
                    },
                    auth: {
                        strategy: 'oauth-jwt',
                        scope: ['User', 'Admin', 'Employee']
                    },
                    // validate: { params: getUserSchema },
                    handler: UserController.getUser,
                    description: 'Get a User by its {id}',
                    tags: ['api'],
                },
            },
            {
                method: 'POST',
                path: '/users',
                config: {
                    cors: {
                        origin: ['*'],
                        additionalHeaders: ['cache-control', 'x-requested-with']
                    },
                    // validate: { payload: createUserSchema },
                    handler: UserController.createUser,
                    description: 'Create a user',
                    tags: ['api'],
                }
            },
            {
                method: 'DELETE',
                path: '/users/{id}',
                config: {
                    cors: {
                        origin: ['*'],
                        additionalHeaders: ['cache-control', 'x-requested-with']
                    },
                    // auth: {
                    //     strategy: 'oauth-jwt',
                    //     scope: ['user']
                    // },
                    validate: { params: getUserSchema },
                    handler: UserController.deleteUser,
                    description: 'Delete a user',
                    tags: ['api'],
                },
            },
            {
                method: 'GET',
                path: '/users',
                config: {
                    cors: {
                        origin: ['*'],
                        additionalHeaders: ['cache-control', 'x-requested-with']
                    },
                    // auth: {
                    //     strategy: 'oauth-jwt',
                    //     scope: ['admin']
                    // }
                    validate: { query: paginationSchema },
                    handler: UserController.listUsers,
                    description: 'List All Users',
                    tags: ['api'],
                },
            },
            {
                method: 'GET',
                path: '/users/filter',
                config: {
                    cors: {
                        origin: ['*'],
                        additionalHeaders: ['cache-control', 'x-requested-with']
                    },
                    // auth: {
                    //     strategy: 'oauth-jwt',
                    //     scope: ['admin']
                    // }
                    // validate: { query: paginationSchema },
                    handler: UserController.filterUser,
                    description: 'List All Users',
                    tags: ['api'],
                },
            },
            {
                method: 'PATCH',
                path: '/users/{id}',
                config: {
                    cors: {
                        origin: ['*'],
                        additionalHeaders: ['cache-control', 'x-requested-with']
                    },
                    // auth: {
                    //     strategy: 'oauth-jwt',
                    //     scope: ['admin']
                    // }
                    // validate: {
                    //     payload: updateUserSchema,
                    //     params: getUserSchema
                    // },
                    handler: UserController.updateUser,
                    description: 'update a user info',
                    tags: ['api'],
                },
            },
            {
                method: 'PATCH',
                path: '/users/{id}/password/change',
                config: {
                    cors: {
                        origin: ['*'],
                        additionalHeaders: ['cache-control', 'x-requested-with']
                    },
                    // auth: {
                    //     strategy: 'oauth-jwt',
                    //     scope: ['admin']
                    // }
                    // validate: {
                    //     params: getUserSchema,
                    //     payload: changePasswordSchema
                    // },
                    handler: UserController.changePassword,
                    description: 'change user password',
                    tags: ['api'],
                },
            },
        ]);
    }
}