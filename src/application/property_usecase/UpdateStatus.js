'use strict';

module.exports = async (propertyId, status, { propertyRepository }) => {
    // check if property exists in the system
    const property = await propertyRepository.getById(propertyId);
    if(!property){ throw new Error('Property does not exists'); }
        
    // update property status 
    return propertyRepository.updateStatus(propertyId, status)
}