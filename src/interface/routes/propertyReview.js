'use strict'

const PropertyReviewController = require('../controllers/PropertyReviewController');
const {createPropertyReviewSchema, updatePropertyReviewSchema, IdSchema, propertyReviewSchema, propertyIdSchema, reviewIdSchema } = require('../validation/propertyReview');

module.exports = {
    name: 'propertyReview',
    version: '1.0.0',
    register: async (server) => {

        server.route([
            {
                method: 'POST',
                path: '/properties/{propertyId}/reviews',
                config: {
                    validate: { 
                        params: propertyIdSchema,
                        payload: createPropertyReviewSchema
                    },
                    handler: PropertyReviewController.createPropertyReview,
                    description: 'Create a propertyReview',
                    tags: ['api'],
                },     
            },
            {
                method: 'GET',
                path: '/properties/{propertyId}/reviews/{id}',
                config: {
                    validate: { 
                        params: IdSchema 
                    },
                    handler: PropertyReviewController.GetPropertyReview,
                    description: 'Get a propertyReview by {id}',
                    tags: ['api'],
                },
            },
            {
                method: 'GET',
                path: '/properties/{propertyId}/reviews',
                config: {
                    validate: { 
                        query: propertyReviewSchema,
                        params: propertyIdSchema
                    },
                    handler: PropertyReviewController.findPropertyReviews,
                    description: 'List All propertyReview',
                    tags: ['api'],
                },
            },
            {
                method: 'PATCH',
                path: '/properties/reviews/{id}',
                config: {
                    validate: {
                        params: reviewIdSchema,
                        payload: updatePropertyReviewSchema
                    },
                    handler: PropertyReviewController.updatePropertyReview,
                    description: 'Updating a propertyReview',
                    tags: ['api'],
                },
            },
            {
                method: "DELETE",
                path: '/properties/reviews/{id}',
                config: {
                    validate: { params: reviewIdSchema },
                    handler: PropertyReviewController.deletePropertyReview,
                    description: 'Delete a propertyReview',
                    tags: ['api'],
                },
            },
        ])
    }
}