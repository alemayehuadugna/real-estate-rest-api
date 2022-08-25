'use strict';

const RevenueController = require('../controllers/RevenueController');

module.exports = {
    name: 'revenue',
    version: '1.0.0',
    register: async (server) => {

        server.route([
            {
                method: 'POST',
                path: '/revenue',
                config: {
                    handler: RevenueController.createRevenue,
                    description: 'Create a lead', 
                    tags: ['api'],
                },
            },
            {
                method: 'GET',
                path: '/revenue/{date}',
                config: {
                    handler: RevenueController.getRevenue,
                    description: "Get a revenue by it {date}",
                    tags: ['api'],
                },
            },
            {
                method: 'PATCH',
                path: '/revenue/update/{date}',
                config: {
                    handler: RevenueController.updateRevenue,
                    description: "updating revenue",
                    tags: ['api'],
                },
            },
        ])
    }
}