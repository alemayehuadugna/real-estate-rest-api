'use strict';

const Conversation = require('../../../domain/entities/Conversation');
const MongooseConversation = require('../../orm/mongoose/schemas/Conversation');
const ConversationRepository = require('../../../domain/repository/ConversationRepository');

module.exports = class extends ConversationRepository {

    constructor() {
        super();
    }

    async create(conversation) {
        const { members } = conversation;
        const mongooseConversation = new MongooseConversation({ members });
        await mongooseConversation.save();
        return new Conversation(mongooseConversation._id, mongooseConversation.members);
    }

    async get(userId) {
        const mongooseConversations = await MongooseConversation.find({
            members: { $in: [userId]},
        });
        // if conversations do not exists return null 
        if (!mongooseConversations) { return mongooseConversations; }
        return mongooseConversations.map((mongooseConversation) => {
            return new Conversation(mongooseConversation._id, mongooseConversation.members);
        });
    }

    async clear(conversationIds) {
        let count = 0;
        try {
            for (let i=0; i<conversationIds.length; i++) {
                const conversation = await MongooseConversation.findOneAndDelete({_id: conversationIds[i]});
                if (!conversation) { count++; }
            }
            return count;
        } catch (err) {
            return err;
        }
    }

    async delete(conversationId) {
        return MongooseConversation.findByIdAndRemove({_id: conversationId});
    }
    
}