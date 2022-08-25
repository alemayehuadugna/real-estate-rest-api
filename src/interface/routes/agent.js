'use strict';

const AgentController = require('../controllers/AgentController');
const UserController = require('../controllers/UserController');
const {createAgentSchema, agentIdSchema, updateAgentSchema, updateAgentRatingSchema } = require('../validation/agent');

module.exports = {
    name: 'agents',
    version: '1.0.0',
    register: async (server) => {

        server.route([
            {
                method: 'GET',
                path: '/agents/{id}',
                config: {
                    cors: {
                        origin: ['*'],
                        additionalHeaders: ['cache-control', 'x-requested-with']
                    },                                        
                    validate: { params: agentIdSchema },
                    handler: AgentController.getAgent,
                    description: 'Get Agent by its {id}',
                    tags: ['api'],
                }
            },

            {
                method: 'POST',
                path: '/agents',
                config: {
                    cors: {
                        origin: ['*'],
                        additionalHeaders: ['cache-control', 'x-requested-with']
                    },
                    // validate: { payload: createAgentSchema },
                    handler: AgentController.createAgent,
                    description: 'Create Agent',
                    tags: ['api'],
                }
            },
            {
                method: 'PATCH',
                path: '/agents/{id}',
                config: {
                    cors: {
                        origin: ['*'],
                        additionalHeaders: ['cache-control', 'x-requested-with']
                    },                                        
                    // validate: {
                    //     payload: updateAgentSchema,
                    //     params: agentIdSchema
                    // },
                    handler: UserController.updateUser,
                    description: 'update a agent info',
                    tags: ['api'],
                },
            },
            {
                method: 'DELETE',
                path: '/agents/{id}',
                config: {
                    cors: {
                        origin: ['*'],
                        additionalHeaders: ['cache-control', 'x-requested-with']
                    },                    
                    validate: { params: agentIdSchema },
                    handler: AgentController.deleteAgent,
                    description: 'Delete a Agent',
                    tags: ['api'],
                },
            },
            {
                method: 'PATCH',
                path: '/agents/{id}/ratings',
                config: {
                    cors: {
                        origin: ['*'],
                        additionalHeaders: ['cache-control', 'x-requested-with']
                    },                    
                    // validate: {
                    //     payload: updateAgentRatingSchema,
                    //     params: agentIdSchema
                    // },
                    handler: AgentController.updateRating,
                    description: 'Update Rating',
                    tags: ['api'],
                },
            },
            {
                method: 'GET',
                path: '/agents',
                config: {
                    cors: {
                        origin: ['*'],
                        additionalHeaders: ['cache-control', 'x-requested-with']
                    },                                      
                    handler: AgentController.listAgents,
                    description: 'Get Paginated Agents List',
                    tags: ['api']
                }
            },
            {
                method: 'GET',
                path: '/agents/filter',
                config: {
                    cors: {
                        origin: ['*'],
                        additionalHeaders: ['cache-control', 'x-requested-with']
                    },    
                    handler: AgentController.filterAgent,
                    description: 'Filter agent by the given query',
                    tags: ['api']                  
                }
            }
        ])
    }
}