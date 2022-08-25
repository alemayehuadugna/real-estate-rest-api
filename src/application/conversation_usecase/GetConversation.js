'use strict';

module.exports = async (userId, { conversationRepository, userRepository }) => {
    // check if the given user exists in the system
    const user = await userRepository.getById(userId);
    if (!user) { throw new Error('User does not exists'); }
    
    const result = await conversationRepository.get(userId);
    // if conversation does not exists throw error
    if (!result) { throw new Error('conversations does not exists for the user'); }
    return result;
}