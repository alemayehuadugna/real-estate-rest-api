'use strict';

const _serializeSingleConversation = (conversation) => {
    return {
        'conversation-id': conversation.conversationId,
        'members': conversation.members,
    };
};

module.exports = class {

    serialize(data) {
        if(!data) {
            throw new Error('Expect data not to be undefined or null');
        }
        if (Array.isArray(data)) {
            return data.map(_serializeSingleConversation);
        }
        return _serializeSingleConversation(data);
    }
}