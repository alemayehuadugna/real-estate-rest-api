'use strict'

const Boom = require('@hapi/boom');

const CreateFeedback = require('../../application/feedback_usecase/CreateFeedback');
const DeleteFeedback = require('../../application/feedback_usecase/DeleteFeedback');
const GetFeedback = require('../../application/feedback_usecase/GetFeedback');
const ListFeedback = require('../../application/feedback_usecase/ListFeedback');

module.exports = {

    async createFeedback(request) {

        // Context
        const serviceLocater = request.server.app.serviceLocater;

        // Input
        const { message, userId, name } = request.payload;

        // Treatment
        var feedback;
        try{
            feedback = await CreateFeedback(message, userId, name, serviceLocater);
        }catch(error){
            return Boom.boomify(error, {statusCode: 400});
        }
        // Output
        return serviceLocater.feedbackSerializer.serialize(feedback);

    },

    async findFeedback(request) {
        // Context
        const serviceLocater = request.server.app.serviceLocater;
        const limit = request.query.limit
            ? parseInt(request.query.limit)
            :20;
        const page = request.query.page ? parseInt(request.query.page) : 1;

        // Treatment
        var feedback;
        try{
            feedback = await ListFeedback(limit, page, serviceLocater);
        } catch(error){
            return Boom.boomify(error, {statusCode: 400});
        }

        // Output
        return { statusCode: 200, total: feedback.total, data: feedback.list };
    },

    async getFeedback(request){
        // Content 
        const serviceLocater = request.server.app.serviceLocater;

        // Input
        const feedbackId = request.params.id;

        // Treatment
        const feedback = await GetFeedback(feedbackId, serviceLocater);

        // Output
        if(!feedback){
            return Boom.notFound();
        }

        return serviceLocater.feedbackSerializer.serialize(feedback);

    },

    async deleteFeedback(request){
        // Content
        const serviceLocater = request.server.app.serviceLocater;

        // Input
        const feedbackId = request.params.id;

        // Treatment
        var feedback;
        try{
            feedback = await DeleteFeedback(feedbackId, serviceLocater);
        }catch(error){
            return Boom.boomify(error, {statusCode: 400});
        }

        // Output
        return {data: serviceLocater.leadSerializer.serialize(feedback), statusCode: 200};
    }
}