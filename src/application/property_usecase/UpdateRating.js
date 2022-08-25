'use strict'

module.exports = async (propertyId, rate, { propertyRepository }) => {
    // get previous like
    const property = await propertyRepository.getById(propertyId);
    if(!property){ throw new Error('Property does not exists'); }

    // do calculation on rating 
    let numberOfRaters = property.numberOfRaters + 1;
    let totalRating = property.totalRating + rate;
    let rating = totalRating / numberOfRaters;

    // update rating
    return propertyRepository.updateRating(propertyId, rating, totalRating, numberOfRaters); 
}