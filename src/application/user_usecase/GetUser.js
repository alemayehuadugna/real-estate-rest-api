'use strict';

module.exports = async (userId, { userRepository }) => {
    const user = await userRepository.getById(userId);
    if (!user) { throw new Error('User dose not exists!'); }
    return user;
}