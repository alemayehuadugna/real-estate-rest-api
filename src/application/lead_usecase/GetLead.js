'use strict';

module.exports = async (leadId, { leadRepository }) =>{     
    return leadRepository.getById(leadId);
} 