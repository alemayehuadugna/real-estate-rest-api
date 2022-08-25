'use strict';

const Message = require("../../../domain/entities/Message");
const MongooseMessage = require("../../orm/mongoose/schemas/Message");
const MessageRepository = require("../../../domain/repository/MessageRepository");

module.exports = class extends MessageRepository{

    constructor(){
        super();
    }

    async create(messages) {
        const { conversationId, senderId, message } = messages;
        const mongooseMessage = new MongooseMessage({ conversationId, senderId, message });
        await mongooseMessage.save();

        return new Message(mongooseMessage._id, mongooseMessage.conversationId, mongooseMessage.senderId, mongooseMessage.message);
    }

    async find(pagination, page, conversationId) {
        const mongooseMessage = await MongooseMessage.find({'conversationId': conversationId}).skip((page -1) * pagination).limit(pagination);
        return mongooseMessage.map((mongooseMessage) =>{
            return new Message(mongooseMessage._id, mongooseMessage.conversationId, mongooseMessage.senderId, mongooseMessage.message);
        });
    }

    async update(messageId, newMessage) {
        const mongooseMessage = await MongooseMessage.findByIdAndUpdate(messageId, {message: newMessage}, {new: true});
        return new Message(mongooseMessage._id, mongooseMessage.conversationId, mongooseMessage.senderId, mongooseMessage.message);
    }

    async delete(messageId){
        return MongooseMessage.findByIdAndDelete(messageId);
    }
}