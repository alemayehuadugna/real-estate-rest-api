'use strict';

module.exports = async (limit, page, searchBy, searchFor, sort, { agentRepository, totalCountRepository }) => {
    let result, total=0;
    if ( searchBy === 'Name') {
        let fullName = searchFor.split(" ");
        result = await agentRepository.filterAgentByName(limit, page, fullName[0], fullName[1]);
    } else if ( searchBy === 'Email') {
        result = await agentRepository.filterAgentByEmail(limit, page, searchFor);
    } else if ( searchBy === 'Id') {
        let agent = await agentRepository.getAgentById(searchFor);
        // if user not found return empty list with total of 0
        if (!agent) { return { list: [], total: 0 }}
        result = { list: [agent], total: total}
    } else if ( searchBy === 'Phone') {
        let agent = await agentRepository.getByPhone(searchFor);
        // if user not found return empty list with total of 0
        if (!agent) { return { list: [], total: 0 }}
        result = { list: [agent], total: total }
    } else if ( searchBy === 'Sales') {
        const agents = await agentRepository.sortAgentBySalesDone(limit, page, sort);
        const totalCount = await totalCountRepository.get();
        result = { list: agents, total: totalCount.totalAgent }
    } else if ( searchBy === 'Rents') {
        const agents = await agentRepository.sortAgentByRentDone(limit, page, sort);
        const totalCount = await totalCountRepository.get();
        result = { list: agents, total: totalCount.totalAgent }        
    } else if ( searchBy === 'Rating') {
        const agents = await agentRepository.sortAgentByRating(limit, page, sort);
        const totalCount = await totalCountRepository.get();
        result = { list: agents, total: totalCount.totalAgent }                
    } else {
        result = { list: [], total }
    }
    return result;
}