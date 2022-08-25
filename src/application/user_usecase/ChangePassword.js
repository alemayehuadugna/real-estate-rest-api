'use strict';

module.exports = async (userId, password, {userRepository}) => {

    const user = await userRepository.updatePassword(userId, password);

    // check if user is equal to null if it is throw error     
    if (!user) { throw new Error('user not found'); }

    return user;
}