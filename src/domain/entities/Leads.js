'use strict'

module.exports = class {
    constructor(leadId = null, agentId, userId, propertyId, type, startDate, endDate, progress, description) { 
        this.leadId = leadId;
        this.agentId = agentId;
        this.userId = userId;
        this.propertyId = propertyId;
        this.type = type;
        this.startDate = startDate;
        this.endDate = endDate;
        this.progress = progress;
        this.description = description;     
    }
};