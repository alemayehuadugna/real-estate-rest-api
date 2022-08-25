'use strict';

const PropertyReview = require('../../../domain/entities/PropertyReview');
const MongoosePropertyReview = require('../../orm/mongoose/schemas/PropertyReview');
const PropertyReviewRepository = require('../../../domain/repository/PropertyReviewRepository');

module.exports = class extends PropertyReviewRepository{

    constructor(){
        super();
    }

    async create(review){
        const { propertyId, userId, comment, rating } = review;
        const mongoosePropertyReview = new MongoosePropertyReview({propertyId, userId, comment, rating});
        await mongoosePropertyReview.save();

        return new PropertyReview(mongoosePropertyReview._id, mongoosePropertyReview.propertyId, mongoosePropertyReview.userId, mongoosePropertyReview.comment, mongoosePropertyReview.rating);
    }

    async getByPropertyAndReviewId(reviewId, propertyId) {
        const mongoosePropertyReview = await MongoosePropertyReview.findOne({ '_id': reviewId, 'propertyId': propertyId});
        if(mongoosePropertyReview == null ){
            return mongoosePropertyReview;
        }else{
            return new PropertyReview(mongoosePropertyReview._id, mongoosePropertyReview.propertyId, mongoosePropertyReview.userId, mongoosePropertyReview.comment, mongoosePropertyReview.rating);
        }

    }

    async find(propertyId, pagination, page) {
        const mongoosePropertyReview = await MongoosePropertyReview.find( {'propertyId': propertyId} ).skip((page - 1) * pagination).limit(pagination);
        return mongoosePropertyReview.map((mongoosePropertyReview) =>{
            return new PropertyReview(mongoosePropertyReview._id, mongoosePropertyReview.propertyId, mongoosePropertyReview.userId, mongoosePropertyReview.comment, mongoosePropertyReview.rating)
        });
    }

    async update(reviewId, newComment, newRating) {
        const mongoosePropertyReview = await MongoosePropertyReview.findByIdAndUpdate(reviewId, {comment: newComment, rating: newRating}, {new: true});
        return new PropertyReview(mongoosePropertyReview._id, mongoosePropertyReview.propertyId, mongoosePropertyReview.userId, mongoosePropertyReview.comment, mongoosePropertyReview.rating);

    }

    async delete(reviewId) {
        return MongoosePropertyReview.findOneAndDelete(reviewId);
    }

    async getById(reviewId) {
        const mongoosePropertyReview = await MongoosePropertyReview.findById(reviewId);
        if(mongoosePropertyReview == null ){
            return mongoosePropertyReview;
        }else{
            return new PropertyReview(mongoosePropertyReview._id, mongoosePropertyReview.propertyId, mongoosePropertyReview.userId, mongoosePropertyReview.comment, mongoosePropertyReview.rating);
        }

    }
};