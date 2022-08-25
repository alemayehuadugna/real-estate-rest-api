'use strict';

module.exports = async (propertyId, {propertyRepository, totalCountRepository}) => {

    // decreasing number of Property
    const totalCount = await totalCountRepository.get();
    const totalCountId = totalCount.totalCountId;
    var totalProperty = totalCount.totalProperty;
    if(totalProperty === 0) { throw new Error('No Property To Delete')};
    totalProperty -= 1;
    totalCountRepository.updateTotalProperty(totalCountId, totalProperty);
    
    const property = await propertyRepository.delete(propertyId);
    
    // if property is not found throw error
    if (!property) { throw new Error('Property does not exits'); }
    return totalProperty;
}