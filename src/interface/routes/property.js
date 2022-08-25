'use strict';

const PropertyController = require('../controllers/PropertyController');
const { createPropertySchema, 
        propertyIdSchema, 
        propertyUpdateSchema, 
        propertyRateSchema, 
        propertyStatusSchema } = require('../validation/property');
const { paginationSchema } = require('../validation/PaginationValidator');


module.exports = {
    name: 'properties',
    version: '1.0.0',
    register: async (server) => {

        server.route([
            {
                method: 'POST',
                path: '/properties',
                config: {
                    cors: {
                        origin: ['*'],
                        additionalHeaders: ['cache-control', 'x-requested-with']
                    },                    
                    payload: {
                        maxBytes: 209715200,
                        output: 'stream',
                        parse: true,                        
                        multipart: true
                    },
                    // validate: { payload: createPropertySchema },
                    handler: PropertyController.createProperty,
                    description: 'Create a new property',
                    tags:['api'],
                }
            },
            {
                method: 'GET',
                path: '/properties',
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
                    handler: PropertyController.getProperties,
                    description: 'List All Properties',
                    tags: ['api'],
                },
            },
            {
                method: 'GET',
                path: '/properties/{id}',
                config: {
                    cors: {
                        origin: ['*'],
                        additionalHeaders: ['cache-control', 'x-requested-with']
                    },                    
                    // validate: { params: propertyIdSchema },
                    handler: PropertyController.getProperty,
                    description: 'Get a Property by its {id}',
                    tags: ['api'],
                },
            },
            {
                method: 'DELETE',
                path: '/properties/{id}',
                config: {
                    cors: {
                        origin: ['*'],
                        additionalHeaders: ['cache-control', 'x-requested-with']
                    },                                        
                    // validate: { params: propertyIdSchema},
                    handler: PropertyController.deleteProperty,
                    description: 'Delete a property by its id',
                    tags: ['api'],
                },
            },
            {
                method: 'PATCH',
                path: '/properties/{id}',
                config: {
                    cors: {
                        origin: ['*'],
                        additionalHeaders: ['cache-control', 'x-requested-with']
                    },     
                    payload: {
                        maxBytes: 209715200,
                        output: 'stream',
                        parse: true,                        
                        multipart: true
                    },                                   
                    // validate: { 
                    //     params: propertyIdSchema,
                    //     payload: propertyUpdateSchema
                    // },
                    handler: PropertyController.updateProperty,
                    description: 'Update a property',
                    tags: ['api'],
                },
            },
            {
                method: 'PATCH',
                path: '/properties/{id}/rating',
                config: {
                    validate: { 
                        params: propertyIdSchema,
                        payload: propertyRateSchema
                    },
                    handler: PropertyController.updateRating,
                    description: 'Update No Of Like',
                    tags: ['api'],
                },
            },
            {
                method: 'PATCH',
                path: '/properties/{id}/status',
                config: {
                    validate: { 
                        params: propertyIdSchema,
                        payload: propertyStatusSchema
                    },
                    handler: PropertyController.updateStatus,
                    description: 'Update No Of Like',
                    tags: ['api'],
                },
            },
            {
                method: 'POST',
                path: '/properties/filter',
                config: {
                    cors: {
                        origin: ['*'],
                        additionalHeaders: ['cache-control', 'x-requested-with']
                    },
                    handler: PropertyController.filterProperties,
                    description: 'Filter properties by the given query',
                    tags: ['api'],
                },
            },
            {
                method: 'POST',
                path: '/upload',
                config: {
                    cors: {
                        origin: ['*'],
                        additionalHeaders: ['cache-control', 'x-requested-with']
                    },                    
                    payload: {
                        maxBytes: 209715200,
                        output: 'stream',
                        parse: true,                        
                        multipart: true
                    },
                    handler: PropertyController.uploadPropertyImages,
                    description: "Upload Property Images",
                    tags: ['api'],
                }
            },
            {
                method: 'GET',
                path: '/properties/images/{file*}',
                handler: {
                    directory: {
                        path: 'src/infrastructure/resource/uploads',
                        listing: true
                    }
                }
            }
        ]);
    }
}