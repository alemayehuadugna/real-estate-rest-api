'use strict';

module.exports = async (limit, page, { agentRepository, totalCountRepository }) => {
    const agents = await agentRepository.findAgents(limit, page);
    // get the total number of agent form totalCount
    const totalCount = await totalCountRepository.get();
    const total = totalCount.totalAgent;
    return {list: agents, total: total};
}