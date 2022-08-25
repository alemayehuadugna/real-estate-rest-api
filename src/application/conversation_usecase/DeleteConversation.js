'use strict';

module.exports = async (conversationId, {conversationRepository}) => {
    const result = await conversationRepository.delete(conversationId);
    // check if conversation exists if it doesn't throw error
    if(!result) { throw new Error('Conversation does not exists'); }
    return result;
}