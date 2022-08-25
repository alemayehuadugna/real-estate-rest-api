'use strict';

const Boom = require('@hapi/boom');

const ClearConversation = require('../../application/conversation_usecase/ClearConversation');
const DeleteConversation = require('../../application/conversation_usecase/DeleteConversation');
const GetConversation = require('../../application/conversation_usecase/GetConversation');
const NewConversation = require('../../application/conversation_usecase/NewConversation');

module.exports = {

    async newConversation(request) {

        // Context
        const serviceLocater = request.server.app.serviceLocater;

        // Input
        const { members } = request.payload;

        // Treatment
        let conversation;
        try {
            conversation = await NewConversation( members, serviceLocater);
        } catch (error) {
            return Boom.boomify(error, {statusCode: 400});
        }

        // Output
        return serviceLocater.conversationSerializer.serialize(conversation);
    },

    async getConversation(request) {

        // Context
        const serviceLocater = request.server.app.serviceLocater;

        // Input
        const userId = request.params.id;

        // Treatment
        let conversations;
        try {
            conversations = await GetConversation(userId, serviceLocater);
        } catch (error) {
            return Boom.boomify(error, {statusCode: 400});
        }
        
        // Output
        return conversations.map(serviceLocater.conversationSerializer.serialize);
    },

    async deleteConversation(request, h) {

        // Context
        const serviceLocater = request.server.app.serviceLocater;

        // Input
        const conversationId = request.params.id;

        // Treatment
        try {
            await DeleteConversation(conversationId, serviceLocater);
        } catch (error) {
            return Boom.boomify(error, {statusCode: 400});
        }

        // Output
        return h.response().code(204);
    },

    async clearConversation(request, h) {

        // Context
        const serviceLocater = request.server.app.serviceLocater;

        // Input
        const { conversationIds } = request.payload;

        // Treatment
        try {
            await ClearConversation(conversationIds, serviceLocater);
        } catch (error) {
            return Boom.boomify(error, {statusCode: 400});
        }

        return h.response().code(204);
    }

}