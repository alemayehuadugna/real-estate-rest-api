'use strict';

const ConversationController = require('../controllers/ConversationController');
const { newConversationSchema, conversationIdSchema, clearConversationSchema } = require('../validation/conversation');

module.exports = {
    name: 'conversations',
    version: '1.0.0',
    register: async (server) => {

        server.route([
            {
                method: 'POST',
                path: '/users/conversations',
                config: {
                    validate: { payload: newConversationSchema },
                    handler: ConversationController.newConversation,
                    description: 'Create new Conversation for user',
                    tags: ['api'],
                },
            },
            {
                method: 'GET',
                path: '/users/conversations/{id}',
                config: {
                    validate: { params: conversationIdSchema },
                    handler: ConversationController.getConversation,
                    description: 'Get list of user Conversations',
                    tags: ['api'],
                },
            },
            {
                method: 'POST',
                path: '/users/conversations/clear',
                config: {
                    validate: { payload: clearConversationSchema },
                    handler: ConversationController.clearConversation,
                    description: 'Delete All User Conversation',
                    tags: ['api'],
                },
            },
            {
                method: 'DELETE',
                path: '/users/conversations/{id}',
                config: {
                    validate: { params: conversationIdSchema },
                    handler: ConversationController.deleteConversation,
                    description: 'Delete Conversation by its Id',
                    tags: ['api'],
                },
            },
        ]);
    }
}