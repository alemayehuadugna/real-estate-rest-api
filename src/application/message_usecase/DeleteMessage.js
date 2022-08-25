'use strict';

module.exports = (messageId, { messageRepository }) => {
    return messageRepository.delete(messageId);
}