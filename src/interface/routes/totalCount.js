'use strict';

const TotalCountController = require('../controllers/totalCountController');

module.exports = {
    name: 'totalCount',
    version: '1.0.0',
    register: async (server) =>{

        server.route([
            {
                method: 'GET',
                path: '/totalCount',
                config: {
                    cors: {
                        origin: ['*'],
                        additionalHeaders: ['cache-control', 'x-requested-with']
                    },
                    handler: TotalCountController.getTotalCount,
                    description: 'Get Total Count Of User, Lead, Property',
                    tags: ['api'],
                }
            },
            {
                method: 'POST',
                path: '/totalCount',
                config: {
                    cors: {
                        origin: ['*'],
                        additionalHeaders: ['cache-control', 'x-requested-with']
                    },
                    handler: TotalCountController.createTotalCount,
                    description: 'Create TotalCount',
                    tags: ['api'],
                }
            }
        ]);
    }
}