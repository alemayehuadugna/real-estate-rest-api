'use strict'

const MessageController = require('../controllers/MessageController');
const { createMessageSchema, updateMessageSchema, messageIdSchema, listMessageSchema } = require('../validation/message');

module.exports = {
    name: 'message',
    version: '1.0.0',
    register: async (server) => {

        server.route([
            {
                method: 'GET',
                path: '/users/conversations/{id}/messages',
                config: {
                    validate: { 
                        params: messageIdSchema,
                        query: listMessageSchema
                     },
                    handler: MessageController.findMessages,
                    description: 'Get a message by its {id}',
                    tags: ['api'],
                },
            },
            {
                method: 'POST',
                path: '/users/conversations/messages',
                config: {
                    validate: { payload: createMessageSchema },
                    handler: MessageController.createMessage,
                    description: 'Create a Message',
                    tags: ['api'],
                },
            },
            {
                method: 'PATCH',
                path: '/users/conversations/messages/{id}',
                config: {
                    validate: {
                        params: messageIdSchema,
                        payload: updateMessageSchema
                    },
                    handler: MessageController.updateMessage,
                    description: 'Updating a message',
                    tags: ['api']
                },
            },
            {
                method: 'DELETE',
                path: '/users/conversations/messages/{id}',
                config: {
                    validate: { params: messageIdSchema },
                    handler: MessageController.deleteMessage,
                    description: 'Delete a message',
                    tags: ['api'],
                },
            },
        ])
    }
}