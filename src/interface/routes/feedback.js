'use strict'

const FeedbackController = require('../controllers/FeedbackController');
const { createFeedbackSchema, feedbackIdSchema, listFeedbackSchema } = require('../validation/feedback');

module.exports = {
    name: 'feedback',
    version: '1.0.0',
    register: async (server) => {

        server.route([
            {
                method: 'GET',
                path: '/users/feedbacks/{id}',
                config: {
                    validate: { params: feedbackIdSchema },
                    handler: FeedbackController.getFeedback,
                    description: 'Get a feedback by {id}',
                    tags: ['api'],
                },
            },
            {
                method: 'POST',
                path: '/users/feedbacks',
                config: {
                    validate: { payload: createFeedbackSchema },
                    handler: FeedbackController.createFeedback,
                    description: 'Create a feedback',
                    tags: ['api'],
                },
            },
            {
                method: 'DELETE',
                path: '/users/feedbacks/{id}',
                config: {
                    cors: {
                        origin: ['*'],
                        additionalHeaders: ['cache-control', 'x-requested-with']
                    },
                    validate: { params: feedbackIdSchema },
                    handler: FeedbackController.deleteFeedback,
                    description: 'Delete a feedback',
                    tags: ['api'],
                },
            },
            {
                method: 'GET',
                path: '/users/feedbacks',
                config: {
                    cors: {
                        origin: ['*'],
                        additionalHeaders: ['cache-control', 'x-requested-with']
                    },
                    validate: { query: listFeedbackSchema },
                    handler: FeedbackController.findFeedback,
                    description: 'List All feedbacks',
                    tags: ['api'],
                },
            },
        ])
    }

}