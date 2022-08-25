'use strict';

const Conversation = require('../../domain/entities/Conversation');

module.exports = async (members, {conversationRepository, userRepository}) => {
    // check if members have same id
    if (members[0] === members[1]) { throw new Error('members cannot be the same')}
    // check if members exists in the system
    const user1 = await userRepository.getById(members[0]);
    if(!user1) { throw new Error('one of the member does not exists'); }
    const user2 = await userRepository.getById(members[1]);
    if(!user2) { throw new Error('one of the member does not exists'); }

    const conversation = new Conversation(null, members);
    return conversationRepository.create(conversation);
}