'use strict';

module.exports = async (agentId, rating, { agentRepository }) => {
    // get previous totalRating and totalUser
    const mongooseAgent = await agentRepository.getAgentById(agentId);
    
    // if agent is null throw error
    if(!mongooseAgent) { throw new Error('Agent does not exists'); }

    var previousRating;
    if(!mongooseAgent.totalRating) { 
        previousRating = 0;
    }else {
        previousRating = mongooseAgent.totalRating;
    }
    var noOfUser;
    if(!mongooseAgent.noOfUser) {
        noOfUser = 0;
    }else {
        noOfUser = mongooseAgent.noOfUser;
    }
    const totalRating = previousRating + rating;
    noOfUser = noOfUser + 1;
    rating = totalRating/noOfUser;

    
    return await agentRepository.updateRating(agentId, totalRating, noOfUser, rating); 
}