'use strict';

const TotalCount = require('../../../domain/entities/TotalCount');
const MongooseTotalCount = require('../../orm/mongoose/schemas/TotalCount');
const TotalCountRepository = require('../../../domain/repository/TotalCountRepository');

module.exports = class extends TotalCountRepository {

    constructor() {
        super();
    }

    async create(totalCount) {
        let { totalUser, totalEmployee, totalAgent, totalLead, totalProperty, totalFeedback, totalReport } = totalCount;
        const mongooseTotalCount = new MongooseTotalCount({ totalUser, totalEmployee, totalAgent, totalLead, totalProperty, totalFeedback, totalReport });
        await mongooseTotalCount.save();

        return new TotalCount(mongooseTotalCount._id, mongooseTotalCount.totalUser, mongooseTotalCount.totalEmployee, mongooseTotalCount.totalAgent,
            mongooseTotalCount.totalLead, mongooseTotalCount.totalProperty, mongooseTotalCount.totalFeedback, mongooseTotalCount.totalReport);         
    }

    async get(){
        const mongooseTotalCount = await MongooseTotalCount.findOne({});
        // result is null return null 
        if (!mongooseTotalCount) { return mongooseTotalCount; }
        return new TotalCount(mongooseTotalCount._id, mongooseTotalCount.totalUser, mongooseTotalCount.totalEmployee, mongooseTotalCount.totalAgent,
                             mongooseTotalCount.totalLead, mongooseTotalCount.totalProperty, mongooseTotalCount.totalFeedback, mongooseTotalCount.totalReport); 
    }


    async updateTotalUser(totalCountId, totalUser){
        await MongooseTotalCount.findByIdAndUpdate(totalCountId, {totalUser: totalUser});
    }

    async updateTotalAgent(totalCountId, totalAgent){
        await MongooseTotalCount.findByIdAndUpdate(totalCountId, {totalAgent: totalAgent});
    }

    async updateTotalEmployee(totalCountId, totalEmployee){
        await MongooseTotalCount.findByIdAndUpdate(totalCountId, {totalEmployee: totalEmployee});
    }

    async updateTotalLead(totalCountId, totalLead){
        await MongooseTotalCount.findByIdAndUpdate(totalCountId, {totalLead: totalLead});
    }

    async updateTotalProperty(totalCountId, totalProperty){
        await MongooseTotalCount.findByIdAndUpdate(totalCountId, {totalProperty: totalProperty});
    }

    async updateTotalFeedback(totalCountId, totalFeedback){
        await MongooseTotalCount.findByIdAndUpdate(totalCountId, {totalFeedback: totalFeedback});
    }

    async updateTotalReport(totalCountId, totalReport){
        await MongooseTotalCount.findByIdAndUpdate(totalCountId, {totalReport: totalReport});
    }


}