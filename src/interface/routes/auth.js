'use strict';

const AuthorizationController = require('../controllers/AuthorizationController');

module.exports = {
    name: 'auth',
    version: '1.0.0',
    register: async (server) => {
        server.route([
            {
                method: 'GET',
                path: '/auth',
                config: {
                    auth: 'oauth-jwt',
                    handler: (request) => request.auth.credentials,
                    description: 'Example of a private resource',
                    tags: ['api'],
                }
            },
            {
                method: 'POST',
                path: '/auth/login',
                config: {
                    cors: {
                        origin: ['*'],
                        additionalHeaders: ['cache-control', 'x-requested-with']
                    },
                    handler: AuthorizationController.getAccessToken,
                    description: 'Return an OAuth 2 access token',
                    tags: ['api'],
                }
            },
        ]);
    }
}