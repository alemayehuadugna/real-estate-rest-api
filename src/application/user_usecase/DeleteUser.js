'use strict';

module.exports = async (userId, {userRepository, totalCountRepository }) => {
    const user = await userRepository.delete(userId);
    // if user is null throw error 
    if (!user) { throw new Error('User does not exists'); }

    // decrement number of User in totalCount
    const totalCount = await totalCountRepository.get();
    const totalCountId = totalCount.totalCountId;
    var totalUser = totalCount.totalUser;
    if (totalUser === 0) { throw new Error('No User To Delete')};
    totalUser -= 1;
    totalCountRepository.updateTotalUser(totalCountId, totalUser);

    return {user: user, total: totalUser };
}