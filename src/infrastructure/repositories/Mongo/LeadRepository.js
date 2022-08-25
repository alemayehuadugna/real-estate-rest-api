'use strict';

const Lead = require("../../../domain/entities/Leads");
const MongooseLead = require("../../orm/mongoose/schemas/Lead");
const LeadRepository = require("../../../domain/repository/LeadsRepository");

module.exports = class extends LeadRepository{

    constructor(){
        super();
    }

    async create(lead){
        const {agentId, userId, propertyId, type, startDate, endDate, progress, description } = lead;
        const mongooseLead = new MongooseLead({agentId, userId, propertyId, type, startDate, endDate, progress, description});
        await mongooseLead.save();

        return new Lead(mongooseLead._id, mongooseLead.agentId, mongooseLead.userId, mongooseLead.propertyId, mongooseLead.type, mongooseLead.startDate, mongooseLead.endDate, mongooseLead.progress, mongooseLead.description);
    }

    async getById(leadId){
        const mongooseLead = await MongooseLead.findById(leadId);
        if(mongooseLead == null){
            return mongooseLead;
        }else{
            return new Lead(mongooseLead._id, mongooseLead.agentId, mongooseLead.userId, mongooseLead.propertyId, mongooseLead.type, mongooseLead.startDate, mongooseLead.endDate, mongooseLead.progress, mongooseLead.description);
        }
    }

    async find(limit, page){
        const [ { paginatedResult, totalCount }] = await MongooseLead.aggregate([
            {
                $facet: {
                    "paginatedResult": [
                        { $match: {}},
                        { $skip: (page - 1) * limit},
                        { $limit: limit}
                    ],
                    "totalCount": [
                        { $match: { }},
                        { $count: 'totalCount' }
                    ]
                }
            }
        ]);
        await MongooseLead.populate(paginatedResult, {path: "agentId userId", select: 'firstName lastName phone'});
        // if data not found return empty array and total 0
        if (paginatedResult.length === 0 || totalCount.length === 0) { return { list: paginatedResult, total: 0 }}
        return {
            list: paginatedResult.map((mongooseLead) => {
                return new Lead(mongooseLead._id, mongooseLead.agentId, mongooseLead.userId, mongooseLead.propertyId, mongooseLead.type, mongooseLead.startDate, mongooseLead.endDate, mongooseLead.progress, mongooseLead.description);
            }),
            total: totalCount[0].totalCount
        };
    }

    async updateProgress(leadId, newProgress){
        const mongooseLead = await MongooseLead.findByIdAndUpdate(leadId, {progress: newProgress}, {new:true});
        return new Lead(mongooseLead._id, mongooseLead.agentId, mongooseLead.userId, mongooseLead.propertyId, mongooseLead.type, mongooseLead.startDate, mongooseLead.endDate, mongooseLead.progress, mongooseLead.description);
    }

    async delete(leadId){
        return MongooseLead.findOneAndDelete(leadId);
    }

    async updateEndDate(leadId){
        await MongooseLead.findByIdAndUpdate(leadId, {endDate: Date.now()}, {new:true});
    }

    async getLeadInfo(agentId, userId){
        const mongooseLead = await MongooseLead.findOne({'agentId': agentId, 'userId': userId});
        return mongooseLead;
    }
    async findByUserId(userId) {
        const mongooseLead = await MongooseLead.find({userId: userId}).populate('agentId', 'phone').populate('userId', 'phone');
        return mongooseLead.map((mongooseLead) => {
            return new Lead(mongooseLead._id, mongooseLead.agentId, mongooseLead.userId, mongooseLead.propertyId, mongooseLead.type, mongooseLead.startDate, mongooseLead.endDate, mongooseLead.progress, mongooseLead.description);
        });
    }
    async findByAgentId(agentId) {
        const mongooseLead = await MongooseLead.find({agentId: agentId}).populate('agentId', 'phone').populate('userId', 'phone');
        return mongooseLead.map((mongooseLead) => {
            return new Lead(mongooseLead._id, mongooseLead.agentId, mongooseLead.userId, mongooseLead.propertyId, mongooseLead.type, mongooseLead.startDate, mongooseLead.endDate, mongooseLead.progress, mongooseLead.description);
        });
    }
}