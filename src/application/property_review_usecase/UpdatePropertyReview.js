'use strict';

// const Validation = require('../property_review_usecase/Validation');

module.exports = async (reviewId, comment, rating, { propertyReviewRepository }) => {

    // checking if propertyReview exists or not
    console.log("id: |", reviewId);
    const propertyReview = await propertyReviewRepository.getById(reviewId);

    if(!propertyReview){
        throw new Error("propertyReview not found");
    }

    // calling repository implementation
    return propertyReviewRepository.update(reviewId, comment, rating);
}