'use strict';

module.exports = async (leadId, { leadRepository, totalCountRepository }) => {
    // decreasing number of lead
    const totalCount = await totalCountRepository.get();
    const totalCountId = totalCount.totalCountId;
    var totalLead = totalCount.totalLead;
    if(totalLead === 0) { throw new Error('No Lead To Delete')}; 
    totalLead -= 1;
    totalCountRepository.updateTotalLead(totalCountId, totalLead);

    // normal delete
    return await leadRepository.delete(leadId);
}