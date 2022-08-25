'use strict'

const Boom = require('@hapi/boom');

const CreatePropertyReview = require('../../application/property_review_usecase/CreatePropertyReview');
const DeletePropertyReview = require('../../application/property_review_usecase/DeletePropertyReview');
const GetPropertyReview = require('../../application/property_review_usecase/GetPropertyReview');
const ListPropertyReview = require('../../application/property_review_usecase/ListPropertyReview');
const UpdatePropertyReview = require('../../application/property_review_usecase/UpdatePropertyReview');

module.exports = {
    
    async createPropertyReview(request) {
        
        // Context
        const serviceLocater = request.server.app.serviceLocater;

        // Input
        const propertyId = request.params.propertyId;
        const { userId, comment, rating } = request.payload;

        // Treatement
        var propertyReview;
        try{
        
            propertyReview = await CreatePropertyReview(propertyId, userId, comment, rating, serviceLocater);
        }catch(error){
           
            return Boom.boomify(error, {statusCode: 400});
        }


        // Output
        return serviceLocater.propertyReviewSerializer.serialize(propertyReview);
    },

    async GetPropertyReview(request) {

        // Context
        const serviceLocater = request.server.app.serviceLocater;

        // Input
        const reviewId = request.params.id;
        const propertyId = request.params.propertyId;

        // Treatment
        const propertyReview = await GetPropertyReview(reviewId, propertyId, serviceLocater);

        // Output
        if(!propertyReview){
            return Boom.notFound();
        }

        return serviceLocater.propertyReviewSerializer.serialize(propertyReview);
    },

    async findPropertyReviews(request) {

        // Context
        const serviceLocater = request.server.app.serviceLocater;
        const pagination = request.query.pagination
            ? parseInt(request.query.pagination)
            :20;
        const page = request.query.page ? parseInt(request.query.page) : 1;
        const propertyId = request.params.propertyId;

        // Treatment
        var propertyReview;
        try{
            propertyReview = await ListPropertyReview(propertyId, pagination, page, serviceLocater);
        } catch(error){
            return Boom.boomify(error, {statusCode: 400});
        }

        // Output
        return propertyReview.map(serviceLocater.propertyReviewSerializer.serialize);
    },

    async updatePropertyReview(request){

        // Content
        const serviceLocater = request.server.app.serviceLocater;

        // Input
        const reviewId = request.params.id;
        const { comment, rating } = request.payload;

        // Treatement
        var propertyReview;
        try{
            propertyReview = await UpdatePropertyReview(reviewId, comment, rating, serviceLocater);
        }catch(error){
            return Boom.boomify(error, {statusCode: 400});
        }

        // Output
        return serviceLocater.propertyReviewSerializer.serialize(propertyReview);
    },

    async deletePropertyReview(request, h) {
        
        // Content
        const serviceLocater = request.server.app.serviceLocater;

        // Input
        const reviewId = request.params.id;

        // Treatement
        await DeletePropertyReview(reviewId, serviceLocater);

        // Output
        return h.response().code(204);

    }
}