'use strict';

module.exports = async (limit, page, { userRepository, totalCountRepository }) => {
    const users =  await userRepository.findUsers(limit, page);
    // get the total number of users from Total Count
    const totalCount = await totalCountRepository.get();
    return {list: users, total: totalCount.totalUser};
}