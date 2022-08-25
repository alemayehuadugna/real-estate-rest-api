'use strict';

module.exports = async (conversationIds, { conversationRepository }) => {

    const result = await conversationRepository.clear(conversationIds);
    if (result !== 0) { throw new Error(`Could not delete ${result} conversations`); }
    return 1;
}