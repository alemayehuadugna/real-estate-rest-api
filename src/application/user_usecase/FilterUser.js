'use strict';

module.exports = async (limit, page, searchBy, searchFor, { userRepository }) => {
    let result, total = 0;
    if (searchBy === 'Name') {
        let fullName = searchFor.split(" ");
        result = await userRepository.filterUserByName(limit,  page, fullName[0], fullName[1]);
    } else if (searchBy === 'Email'){
        result = await userRepository.filterUserByEmail(limit, page, searchFor);
    } else if (searchBy === 'Id') {
        let user = [await userRepository.getById(searchFor)];
        total = user.length
        result = { list: user, total: total}
    } else if (searchBy === 'Phone') {
        let user = await userRepository.getByPhone(searchFor);
        // if user not found return empty list with total of 0
        if (!user) { return { list: [], total: 0 }}
        result = { list: [user], total: total }
    }
    return result;   
}