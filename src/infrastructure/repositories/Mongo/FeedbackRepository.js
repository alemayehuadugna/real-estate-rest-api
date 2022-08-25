'use strict';

const Feedback = require("../../../domain/entities/FeedBack");
const MongooseFeedback = require("../../orm/mongoose/schemas/Feedback");
const FeedbackRepository = require("../../../domain/repository/FeedbackRepository");

module.exports = class extends FeedbackRepository{

    constructor(){
        super();
    }

    async create(feedback){
        const {message, userId, name } = feedback;
        const mongooseFeedback = new MongooseFeedback({message, userId, name});
        await mongooseFeedback.save();

        return new Feedback(mongooseFeedback._id, mongooseFeedback.message, mongooseFeedback.userId, mongooseFeedback.name);
    }

    async getById(feedbackId){
        const mongooseFeedback = await MongooseFeedback.findById(feedbackId);
        return new Feedback(mongooseFeedback._id, mongooseFeedback.message, mongooseFeedback.userId, mongooseFeedback.name);
    }

    async find(limit, page){
        const [ { paginatedResult, totalCount }] = await MongooseFeedback.aggregate([
            {
                $facet: {
                    "paginatedResult": [
                        { $match: {}},
                        { $skip: (page - 1) * limit},
                        { $limit: limit}
                    ],
                    "totalCount": [
                        { $match: {}},
                        { $count: 'totalCount' }
                    ]
                }
            }
        ]);

        // if data not found return empty array and total=0
        if(paginatedResult.length === 0 || totalCount.length === 0) { return { list: paginatedResult, total: 0 }}
        return {
            list: paginatedResult.map((mongooseFeedback) => {
                return new Feedback(mongooseFeedback._id, mongooseFeedback.message, mongooseFeedback.userId, mongooseFeedback.name);
            }),
            total: totalCount[0].totalCount
        };
    }

    async delete(feedbackId){
        return MongooseFeedback.findByIdAndDelete(feedbackId);
    }
}