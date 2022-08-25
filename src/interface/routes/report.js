'use strict';

const ReportController = require('../controllers/ReportController');
const { createReportSchema, reportIdSchema, reportId, listReportSchema } = require('../validation/report');

module.exports = {
    name: 'reports',
    version: '1.0.0',
    register: async (server) =>{

        server.route([
            {
                method: 'POST',
                path: '/users/{reporterId}/reports',
                config: {
                    validate: { 
                        params: reportIdSchema,
                        payload: createReportSchema 
                    },
                    handler: ReportController.createReport,
                    description: 'Create a Report',
                    tags: ['api'],
                }
            },
            {
                method: 'GET',
                path: '/users/reports',
                config: {
                    cors: {
                        origin: ['*'],
                        additionalHeaders: ['cache-control', 'x-requested-with']
                    },
                    validate: { query: listReportSchema },
                    handler: ReportController.findReports,
                    description: 'Get List of Report',
                    tags: ['api'],
                }
            },
            {
                method: 'GET',
                path: '/users/reports/{id}',
                config: {
                    cors: {
                        origin: ['*'],
                        additionalHeaders: ['cache-control', 'x-requested-with']
                    },
                    validate: {params: reportId},
                    handler: ReportController.searchById,
                    description: 'Get Report',
                    tags: ['api'],
                }
            },
            {
                method: 'DELETE',
                path: '/users/reports/{id}',
                config: {
                    cors: {
                        origin: ['*'],
                        additionalHeaders: ['cache-control', 'x-requested-with']
                    },
                    validate: { params: reportId },
                    handler: ReportController.deleteReport,
                    description: 'Delete a report',
                    tags: ['api'],
                },
            },
        ]);
    }
}