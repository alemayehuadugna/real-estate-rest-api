'use strict';

const User = require('../../domain/entities/User');

module.exports = async (firstName, lastName, phone, email, password, profilePicture, { userRepository, totalCountRepository }) => {

    // check if user exists by the given phone number then if it exists don't create account throw error
    var result = await userRepository.getByPhone(phone);
    if (result) { throw new Error('User already exists'); }
    
    // increment tht total number of user in totalCount
    const totalCount = await totalCountRepository.get();    
    const totalCountId = totalCount.totalCountId;
    var totalUser = totalCount.totalUser;
    totalUser += 1;
    totalCountRepository.updateTotalUser(totalCountId, totalUser);
    
    const role = ['User'];
    const user = new User(null, firstName, lastName, phone, email, password, role, profilePicture);
    return userRepository.create(user);   
}
