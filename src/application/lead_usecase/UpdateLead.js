'use strict'


module.exports = async (leadId, newProgress, { leadRepository, agentRepository } ) => {

    // checking if lead exists or not
    const lead = await leadRepository.getById(leadId);

    if(!lead){
        throw new Error("lead not found");
    }
    
    // setting endDate
    if(newProgress == 'success' || newProgress == 'failure'){
        await leadRepository.updateEndDate(leadId);
    }

    if(newProgress == 'success'){
        const mongooseLead = await leadRepository.getById(leadId);
        const agentId = mongooseLead.agentId;
        if(mongooseLead.type === 'sale'){
            const mongooseAgent = await agentRepository.getAgentById(agentId);
            const previousSalesDone = mongooseAgent.salesDone;
            await agentRepository.updateSalesDone(agentId, previousSalesDone);
        }else if(mongooseLead.type === 'rent'){
            const mongooseAgent = await agentRepository.getAgentById(agentId);
            const previousRentDone = mongooseAgent.rentDone;
            await agentRepository.updateRentDone(agentId, previousRentDone); 
        }
    }

    // calling repository implementation
    return leadRepository.updateProgress(leadId, newProgress);
}