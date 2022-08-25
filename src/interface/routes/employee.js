'use strict';

const EmployeeController = require('../controllers/EmployeeController');
const UserController = require('../controllers/UserController');

module.exports = {
    name: 'employees',
    version: '1.0.0',
    register: async (server) => {

        server.route([
            {
                method: 'GET',
                path: '/employees/{id}',
                config: {
                    cors: {
                        origin: ['*'],
                        additionalHeaders: ['cache-control', 'x-requested-with']
                    },                    
                    handler: EmployeeController.getEmployee,
                    description: 'Get Employee by its {id}',
                    tags: ['api'],
                }
            },
            {
                method: 'POST',
                path: '/employees',
                config: {
                    cors: {
                        origin: ['*'],
                        additionalHeaders: ['cache-control', 'x-requested-with']
                    },                    
                    handler: EmployeeController.createEmployee,
                    description: 'Create a new Employee',
                    tags: ['api'],
                }
            },
            {
                method: 'PATCH',
                path: '/employees/{id}',
                config: {
                    cors: {
                        origin: ['*'],
                        additionalHeaders: ['cache-control', 'x-requested-with']
                    },                    
                    handler: UserController.updateUser,
                    description: 'Update Employee Information',
                    tags: ['api'],
                }
            },
            {
                method: 'DELETE',
                path: '/employees/{id}',
                config: {
                    cors: {
                        origin: ['*'],
                        additionalHeaders: ['cache-control', 'x-requested-with']
                    },                    
                    handler: EmployeeController.deleteEmployee,
                    description: 'Delete Employee by {id}',
                    tags: ['api']
                }
            },
            {
                method: 'PATCH',
                path: '/employees/{id}/ratings',
                config: {
                    cors: {
                        origin: ['*'],
                        additionalHeaders: ['cache-control', 'x-requested-with']
                    },                    
                    handler: EmployeeController.updateRating,
                    description: 'Update Employee Rating by {id}',
                    tags: ['api'],
                }
            },
            {
                method: 'GET',
                path: '/employees',
                config: {
                    cors: {
                        origin: ['*'],
                        additionalHeaders: ['cache-control', 'x-requested-with']
                    },
                    handler: EmployeeController.listEmployee,
                    description: 'Get Paginated employee',
                    tags: ['api']
                }
            }
        ])
    }
}