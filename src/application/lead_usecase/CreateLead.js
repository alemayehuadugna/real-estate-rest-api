'use strict';

const Lead = require('../../domain/entities/Leads');


module.exports = async (agentId, userId, propertyId, type, description, { leadRepository, userRepository, propertyRepository, totalCountRepository, agentRepository }) => {    
    
    // checking if agent/user/property exists or not
    const user = await userRepository.getById(userId);
    const agent = await agentRepository.getAgentById(agentId);
    const property = await propertyRepository.getById(propertyId);

    if(!user){
        throw new Error("user not found");
    }else if(!agent){
        throw new Error("agent not found");
    }else if(!property){
        throw new Error("property not found");
    }
    
    // checking if userId is the same as AgentId
    if(userId === agentId){
        throw new Error("User And Agent Id Is The Same")
    }
    // checking if agentId inside property is the same as agentId received
    if( property.agentId._id.toString() !== agentId) { throw new Error("Property Is Not Uploaded By Agent")}
    
    // checking if to create new lead or not
    const leadInfo = await leadRepository.getLeadInfo(agentId, userId);
    if(leadInfo == null){
        // calling repository implementation
        const lead = new Lead(null, agentId, userId, propertyId, type, new Date(), null, 'pending', description);

        // increment Lead
        const totalCount = await totalCountRepository.get();
        const totalCountId = totalCount.totalCountId;
        var totalLead = totalCount.totalLead;
        totalLead += 1;
        totalCountRepository.updateTotalLead(totalCountId, totalLead);

        //normal create
        return await leadRepository.create(lead);
    }else if(leadInfo.progress !== 'pending'){
        // calling repository implementation
        const lead = new Lead(null, agentId, userId, propertyId, type, new Date(), null, 'pending', description);
        return await leadRepository.create(lead);
    }else{
        throw new Error("Lead Already Created");
    }
}