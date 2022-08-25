'use strict';

module.exports = async (reviewId, { propertyReviewRepository }) => {  
    return propertyReviewRepository.delete(reviewId);
}