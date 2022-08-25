'use strict';

module.exports = class {
    constructor(totalCountId = null, totalUser, totalEmployee, totalAgent, totalLead, totalProperty, totalFeedback, totalReport){
        this.totalCountId = totalCountId;
        this.totalUser = totalUser;
        this.totalEmployee = totalEmployee
        this.totalAgent = totalAgent;
        this.totalLead = totalLead;
        this.totalProperty = totalProperty;
        this.totalFeedback = totalFeedback;
        this.totalReport = totalReport;
    }
};