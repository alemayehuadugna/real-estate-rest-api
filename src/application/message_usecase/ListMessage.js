'use strict';

module.exports = async (pagination, page, conversationId, { messageRepository }) => {
    const message = await messageRepository.find(pagination, page, conversationId);
    if(!message.length) { throw new Error('No Message Found');}
    return message;
}