 'use strict'

const Message = require('../../domain/entities/Message');

module.exports = async (conversationId, senderId, message, { messageRepository, userRepository }) => {

    // checking if user exists or not
    const user = await userRepository.getById(senderId);

    if(!user){
        throw new Error("user not found");
    }

    // calling repository implementation
    const messages = new Message(null, conversationId, senderId, message);
    return messageRepository.create(messages); 
}