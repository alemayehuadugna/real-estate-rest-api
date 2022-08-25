'use strict';

const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Package = require('../../../package');

const createServer = async () => {

    // Create a Server with host and port
    const server = Hapi.server({
        port: process.env.PORT || 3000
    });

    // Register vendors plugins
    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            option: {
                info: {
                    title: 'Test API Documentation',
                    version: Package.version,
                }
            }
        }
    ]);

    // Register custom plugins
    await server.register([
        require('./oauth'),
        require('../../interface/routes/auth'),
        require('../../interface/routes/users'),
        require('../../interface/routes/property'),
        require('../../interface/routes/lead'),
        require('../../interface/routes/propertyReview'),
        require('../../interface/routes/booking'),
        require('../../interface/routes/feedback'),
        require('../../interface/routes/revenue'),
        require('../../interface/routes/message'),
        require('../../interface/routes/conversation'),
        require('../../interface/routes/notification'),
        require('../../interface/routes/report'),
        require('../../interface/routes/totalCount'),
        require('../../interface/routes/todoList'),
        require('../../interface/routes/agent'),
        require('../../interface/routes/favorite'),
        require('../../interface/routes/employee'),

    ]);

    server.app.serviceLocater = require('../../infrastructure/config/service-locater');

    return server;
};

module.exports = createServer;