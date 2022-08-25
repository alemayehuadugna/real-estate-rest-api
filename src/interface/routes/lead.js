'use strict';

const LeadController = require('../controllers/LeadController');
const {createLeadSchema, updateLeadSchema, leadIdSchema, phoneSchema } = require('../validation/lead');
const { paginationSchema } = require('../validation/PaginationValidator');

module.exports = {
    name: 'lead',
    version: '1.0.0',
    register: async (server) => {

        server.route([
            {
                method: 'GET',
                path: '/leads/{id}',
                config: {
                    validate: { params: leadIdSchema },
                    handler: LeadController.getLead,
                    description: 'Get a lead by its {id}',
                    tags: ['api'],
                },
            },
            {
                method: 'POST',
                path: '/leads',
                config: {
                    cors: {
                        origin: ['*'],
                        additionalHeaders: ['cache-control', 'x-requested-with']
                    },
                    validate: { payload: createLeadSchema },
                    handler: LeadController.createLead,
                    description: 'Create a lead',
                    tags: ['api'],
                },
            },
            {
                method: 'PATCH',
                path: '/leads/{id}',
                config: {
                    cors: {
                        origin: ['*'],
                        additionalHeaders: ['cache-control', 'x-requested-with']
                    },
                    validate: { 
                        payload: updateLeadSchema,
                        params: leadIdSchema
                     },
                    handler: LeadController.updateLead,
                    description: 'Updating a lead',
                    tags: ['api'],
                },
            },
            {
                method: 'DELETE',
                path: '/leads/{id}',
                config: {
                    cors: {
                        origin: ['*'],
                        additionalHeaders: ['cache-control', 'x-requested-with']
                    },
                    validate: { params: leadIdSchema },
                    handler: LeadController.deleteLead,
                    description: 'Delete a lead',
                    tags: ['api'],
                },
            },
            {
                method: 'GET',
                path: '/leads/search',
                config: {
                    cors: {
                        origin: ['*'],
                        additionalHeaders: ['cache-control', 'x-requested-with']
                    },
                    validate: { query: phoneSchema },
                    handler: LeadController.searchByPhone,
                    description: 'Search Lead',
                    tags: ['api'], 
                },
            },
            {
                method: 'GET',
                path: '/leads',
                config: {
                    cors: {
                        origin: ['*'], // an array of origins or 'ignore'
                        headers: ['Authorization'], // an array of strings - 'Access-Control-Allow-Headers'
                        exposedHeaders: ['Accept'], // an array of exposed headers - 'Access-Control-Expose-Headers',
                        additionalExposedHeaders: ['Accept'], // an array of additional exposed headers
                        maxAge: 60,
                        credentials: true // boolean - 'Access-Control-Allow-Credentials'
                    },
                    validate: { query: paginationSchema },
                    handler: LeadController.findLeads,
                    description: 'List All leads',
                    tags: ['api'],
                },
            },
        ])
    }

}