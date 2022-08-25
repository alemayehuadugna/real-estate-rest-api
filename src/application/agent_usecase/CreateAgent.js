'use strict';

const Agent = require('../../domain/entities/Agent');

module.exports = async (firstName, lastName, phone, email, password, profilePicture, { agentRepository, userRepository, totalCountRepository }) =>{

    // check if agent exists by phone number
    var agent = await userRepository.getByPhone(phone);
    if(agent) { throw new Error('Agent already exists'); }

    // increment agent number of agent in totalCount
    const totalCount = await totalCountRepository.get();
    const totalCountId = totalCount.totalCountId;
    var totalAgent = totalCount.totalAgent;
    totalAgent += 1;
    totalCountRepository.updateTotalAgent(totalCountId, totalAgent);

    // create new agent
    const role = ['Agent'];
    agent = new Agent(null, firstName, lastName, phone, email, password, role, profilePicture, 0,0,0,0,0);
    return agentRepository.create(agent);
}