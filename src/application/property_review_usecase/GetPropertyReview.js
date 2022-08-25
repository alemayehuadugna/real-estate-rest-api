'use strict';

module.exports = (reviewId, propertyId, { propertyReviewRepository }) =>{
    return propertyReviewRepository.getByPropertyAndReviewId(reviewId, propertyId);
}