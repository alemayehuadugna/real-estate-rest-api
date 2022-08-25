'use strict'

const Boom = require('@hapi/boom');

const CreateMessage = require('../../application/message_usecase/CreateMessage');
const ListMessages = require('../../application/message_usecase/ListMessage');
const DeleteMessage = require('../../application/message_usecase/DeleteMessage');
const UpdateMessage = require('../../application/message_usecase/UpdateMessage');

module.exports = {

    async createMessage(request) {

        // Context
        const serviceLocater = request.server.app.serviceLocater;

        // Input
        const { conversationId, senderId, message } = request.payload;

        // Treatment
        var messages;
        try{
            messages = await CreateMessage(conversationId, senderId, message, serviceLocater);
        }catch(error){
            return Boom.boomify(error, {statusCode: 400});
        }

        // Output
        return serviceLocater.messageSerializer.serialize(messages); 
    },

    async findMessages(request) {

        // Content
        const serviceLocater = request.server.app.serviceLocater;
        const pagination = request.query.pagination
            ? parseInt(request.query.pagination)
            :20;
        const page = request.query.page ? parseInt(request.query.page) : 1;

        // Input
        const conversationId = request.params.id;

        // Treatment
        var messages;
        try{
            messages = await ListMessages(pagination, page, conversationId, serviceLocater);
        } catch(error) {
            return Boom.boomify(error, {statusCode: 400});
        }

        // Output
        if(!messages){
            return Boom.notFound();
        }

        return serviceLocater.messageSerializer.serialize(messages);
    },

    async updateMessage(request) {
        
        //Content
        const serviceLocater = request.server.app.serviceLocater;

        // Input
        const messageId = request.params.id;
        const message = request.payload.message;

        // Treatment
        var messages;
        try{
            messages = await UpdateMessage(messageId, message, serviceLocater);
        }catch(error){
            return Boom.boomify(error, {statusCode: 400});
        }
        // Output
        return serviceLocater.messageSerializer.serialize(messages);
    },

    async deleteMessage(request, h) {

        // Content
        const serviceLocater = request.server.app.serviceLocater;

        // Input
        const messageId = request.params.id;

        // Treatment
        await DeleteMessage(messageId, serviceLocater);

        // Output
        return h.response().code(204);
    }

}
