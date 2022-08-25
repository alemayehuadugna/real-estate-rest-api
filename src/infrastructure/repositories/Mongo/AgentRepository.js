'use strict';

const Agent = require('../../../domain/entities/Agent');
const MongooseAgent = require('../../orm/mongoose/schemas/Agent');
const AgentRepository = require('../../../domain/repository/AgentRepository');

module.exports = class extends AgentRepository {

    constructor(){
        super();
    }

    async create(agent) {

        const {firstName, lastName, phone, email, password, role, profilePicture, salesDone, rentDone, totalRating, numberOfRaters, rating } = agent;
        const mongooseAgent = new MongooseAgent({firstName, lastName, phone, email, password, role, profilePicture, salesDone, rentDone, totalRating, numberOfRaters, rating });

        await mongooseAgent.save();
        return new Agent(mongooseAgent._id, mongooseAgent.firstName, mongooseAgent.lastName, mongooseAgent.phone, mongooseAgent.email, 
            mongooseAgent.password, mongooseAgent.role, mongooseAgent.profilePicture, mongooseAgent.salesDone,
            mongooseAgent.rentDone, mongooseAgent.totalRating, mongooseAgent.numberOfRaters, mongooseAgent.rating);
    }

    async getAgentById(agentId){
        const mongooseAgent = await MongooseAgent.findById(agentId);
        if(!mongooseAgent){ return mongooseAgent; }
        return new Agent(mongooseAgent._id, mongooseAgent.firstName, mongooseAgent.lastName, mongooseAgent.phone, mongooseAgent.email, 
            mongooseAgent.password, mongooseAgent.role, mongooseAgent.profilePicture, mongooseAgent.salesDone,
            mongooseAgent.rentDone, mongooseAgent.totalRating, mongooseAgent.numberOfRaters, mongooseAgent.rating);

    }

    async getByPhone(phoneNumber) {
        const mongooseAgent = await MongooseAgent.findOne({ phone: phoneNumber});
        // if user is not found return null
        if (!mongooseAgent) { return mongooseAgent; }
        return new Agent(mongooseAgent._id, mongooseAgent.firstName, mongooseAgent.lastName, mongooseAgent.phone, mongooseAgent.email, 
            mongooseAgent.password, mongooseAgent.role, mongooseAgent.profilePicture, mongooseAgent.salesDone,
            mongooseAgent.rentDone, mongooseAgent.totalRating, mongooseAgent.numberOfRaters, mongooseAgent.rating);
    }

    async updateSalesDone(agentId, previousSalesDone) {
        var newSale = previousSalesDone + 1;
        await MongooseAgent.findOneAndUpdate({_id: agentId}, {salesDone: newSale}, {new:true});
    }

    async updateRentDone(agentId, previousRentDone) {
        var newSale = previousRentDone + 1;
        await MongooseAgent.findOneAndUpdate({_id: agentId}, {rentDone: newSale}, {new:true});
    }

    async updateRating(agentId, totalRating, numberOfRaters, rating) {
        const mongooseAgent = await MongooseAgent.findOneAndUpdate({_id: agentId}, {totalRating: totalRating, numberOfRaters:numberOfRaters, rating:rating}, {new:true});
        return new Agent(mongooseAgent._id, mongooseAgent.firstName, mongooseAgent.lastName, mongooseAgent.phone, mongooseAgent.email, 
            mongooseAgent.password, mongooseAgent.role, mongooseAgent.profilePicture, mongooseAgent.salesDone,
            mongooseAgent.rentDone, mongooseAgent.totalRating, mongooseAgent.numberOfRaters, mongooseAgent.rating);
    }

    async findAgents(limit, page) {
        const mongooseAgents = await MongooseAgent.find({ role: { $in: ["Agent"]}})
            .skip((page - 1) * limit)
            .limit(limit);
        return mongooseAgents.map((mongooseAgent) => {
            return new Agent(mongooseAgent._id, mongooseAgent.firstName, mongooseAgent.lastName, mongooseAgent.phone, mongooseAgent.email, 
                mongooseAgent.password, mongooseAgent.role, mongooseAgent.profilePicture, mongooseAgent.salesDone,
                mongooseAgent.rentDone, mongooseAgent.totalRating, mongooseAgent.numberOfRaters, mongooseAgent.rating);
        });
    }

    async sortAgentByRentDone(limit, page, order) {
        const mongooseAgents = await MongooseAgent.find({ 'userType': 'Agent' })
            .sort({ 'rentDone': order})
            .skip((page - 1) * limit)
            .limit(limit);
        return mongooseAgents.map((mongooseAgent) => {
            return new Agent(mongooseAgent._id, mongooseAgent.firstName, mongooseAgent.lastName, mongooseAgent.phone, mongooseAgent.email, 
                mongooseAgent.password, mongooseAgent.role, mongooseAgent.profilePicture, mongooseAgent.salesDone,
                mongooseAgent.rentDone, mongooseAgent.totalRating, mongooseAgent.numberOfRaters, mongooseAgent.rating);
        });        
    }

    async sortAgentBySalesDone(limit, page, order) {
        const mongooseAgents = await MongooseAgent.find({ 'userType': 'Agent' })
            .sort({ 'salesDone': order})
            .skip((page - 1) * limit)
            .limit(limit);
        return mongooseAgents.map((mongooseAgent) => {
            return new Agent(mongooseAgent._id, mongooseAgent.firstName, mongooseAgent.lastName, mongooseAgent.phone, mongooseAgent.email, 
                mongooseAgent.password, mongooseAgent.role, mongooseAgent.profilePicture, mongooseAgent.salesDone,
                mongooseAgent.rentDone, mongooseAgent.totalRating, mongooseAgent.numberOfRaters, mongooseAgent.rating);
        });        
    }

    async sortAgentByRating(limit, page, order) {
        const mongooseAgents = await MongooseAgent.find({ 'userType': 'Agent' })
            .sort({ 'rating': order})
            .skip((page - 1) * limit)
            .limit(limit);
        return mongooseAgents.map((mongooseAgent) => {
            return new Agent(mongooseAgent._id, mongooseAgent.firstName, mongooseAgent.lastName, mongooseAgent.phone, mongooseAgent.email, 
                mongooseAgent.password, mongooseAgent.role, mongooseAgent.profilePicture, mongooseAgent.salesDone,
                mongooseAgent.rentDone, mongooseAgent.totalRating, mongooseAgent.numberOfRaters, mongooseAgent.rating);
        });        
    }

    async filterAgentByName(limit, page, firstName, lastName) {
        const [{ paginatedResult, totalCount }] = await MongooseAgent.aggregate([
            {
                $facet: {
                    "paginatedResult": [
                        { $match: {'firstName': firstName, 'lastName': lastName, 'userType': 'Agent'}},
                        { $skip: (page - 1) * limit },
                        { $limit: limit }
                    ],
                    "totalCount": [
                        { $match: {'firstName': firstName, 'lastName': lastName, 'userType': 'Agent'}},
                        { $count: 'totalCount' }
                    ]
                }
            }
        ]);
        // if data not found return empty array and total with 0
        if (paginatedResult.length === 0 || totalCount.length === 0) { return { list: paginatedResult, total: 0 }}
        return {
            list: paginatedResult.map((mongooseAgent) => {
                return new Agent(mongooseAgent._id, mongooseAgent.firstName, mongooseAgent.lastName, mongooseAgent.phone, mongooseAgent.email, 
                    mongooseAgent.password, mongooseAgent.role, mongooseAgent.profilePicture, mongooseAgent.salesDone,
                    mongooseAgent.rentDone, mongooseAgent.totalRating, mongooseAgent.numberOfRaters, mongooseAgent.rating);
            }),
            total: totalCount[0].totalCount
        }
    }
    

    async filterAgentByEmail(limit, page, email) {
        const [{ paginatedResult, totalCount }] = await MongooseAgent.aggregate([
            {
                $facet: {
                    "paginatedResult": [
                        { $match: { 'email': email, 'userType': 'Agent' }},
                        { $skip: (page - 1) * limit },
                        { $limit: limit }
                    ],
                    "totalCount": [
                        { $match: { 'email': email, 'userType': 'Agent' }},
                        { $count: 'totalCount' }
                    ]
                }
            }
        ])
        // if data not found return empty array with total of 0
        if (paginatedResult.length === 0 || totalCount.length === 0) { return { list: paginatedResult, total: 0 }}
        return {
            list: paginatedResult.map((mongooseAgent) => {
                return new Agent(mongooseAgent._id, mongooseAgent.firstName, mongooseAgent.lastName, mongooseAgent.phone, mongooseAgent.email, 
                    mongooseAgent.password, mongooseAgent.role, mongooseAgent.profilePicture, mongooseAgent.salesDone,
                    mongooseAgent.rentDone, mongooseAgent.totalRating, mongooseAgent.numberOfRaters, mongooseAgent.rating);
            }),
            total: totalCount[0].totalCount
        }
    }

}