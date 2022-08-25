'use strict';

module.exports = async (agentId, { userRepository, totalCountRepository }) =>{
    const result = await userRepository.delete(agentId); 
    // if agent is null throw error
    if (!result) { throw new Error('Agent does not exists'); }

    // decreasing number of Agent
    const totalCount = await totalCountRepository.get();
    const totalCountId = totalCount.totalCountId;
    var totalAgent = totalCount.totalAgent;
    if(totalAgent === 0) { throw new Error('No Agent To Delete')};
    totalAgent -= 1;
    totalCountRepository.updateTotalAgent(totalCountId, totalAgent);

    return {agent: result, total: totalAgent}; 
}