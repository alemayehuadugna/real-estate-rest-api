'use strict';

module.exports = async (propertyId, { propertyRepository}) => {
    
    const property = await propertyRepository.getById(propertyId);
    // if property does not exists throw error
    if (!property) { throw new Error('Property does not exists'); }
    return property;
}