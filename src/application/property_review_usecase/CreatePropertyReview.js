'use strict';

const PropertyReview = require('../../domain/entities/PropertyReview');
// const Validation = require('../property_review_usecase/Validation');

module.exports = async (propertyId, userId, comment, rating, { propertyReviewRepository,userRepository,propertyRepository }) => {
    
    // checking if agent/user/property exists or not
    const user = await userRepository.getById(userId);
    const property = await propertyRepository.getById(propertyId);

    if(!user){
        throw new Error("user not found");
    }else if(!property){
        throw new Error("property not found");
    }   
   
    // calling repository implementation
    const propertyReview = new PropertyReview(null, propertyId, userId, comment, rating);
    return propertyReviewRepository.create(propertyReview);

}