'use strict'

module.exports = async (messageId, newMessage, { messageRepository } ) => {

    // calling repository implementation
    return messageRepository.update(messageId, newMessage);
}