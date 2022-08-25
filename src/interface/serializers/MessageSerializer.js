'use strict'

const _serializeSingleMessage = (messages) => {
    return {
        'message-id': messages.messageId,
        'conversation-id': messages.conversationId,
        'sender-id': messages.senderId,
        'message': messages.message,
    };
};

module.exports = class {
    serialize(data) {
        if(!data) {
            throw new Error('Expect data to be not undefined nor null');
        }
        if(Array.isArray(data)) {
            return data.map(_serializeSingleMessage);
        }
        return _serializeSingleMessage(data);
    }
}