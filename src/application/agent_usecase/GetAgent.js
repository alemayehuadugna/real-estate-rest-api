'use strict';

module.exports = async (agentId, { agentRepository }) =>{
    const agent = await agentRepository.getAgentById(agentId);
    if (!agent) { throw new Error('Agent does not exists!'); }
    return agent;
}