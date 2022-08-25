'use strict'

module.exports = async (propertyId, pagination, page, { propertyReviewRepository }) =>{
    const propertyReview =  await propertyReviewRepository.find(propertyId, pagination, page);
    if(!propertyReview.length) { throw new Error('No PropertyReview Found'); }
    return propertyReview;
}