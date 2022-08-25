'use strict'

module.exports = async (id, firstName, lastName, email, profilePicture, {userRepository} ) => {
    const user = await userRepository.update(id, firstName, lastName, email, profilePicture);
    // if user does not exists throw error
    if(!user) { throw new Error('User does not exists'); }
    return user;
}