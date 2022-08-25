'use strict'

const Report = require('../../../domain/entities/Report');
const MongooseReport = require('../../orm/mongoose/schemas/Report');
const ReportRepository = require('../../../domain/repository/ReportRepository');

module.exports = class extends ReportRepository {

    constructor() {
        super();
    }

    async create(report){
        const { reportedId, count, reportedList } = report;
        const mongooseReport = new MongooseReport({ reportedId, count, reportedList });
        return await mongooseReport.save();
    }

    async getUser(userId){
        const mongooseReport = await MongooseReport.findOne({ reportedId: userId });
        if(mongooseReport == null){
            return null;
        }else{
            return mongooseReport;
        }
    }

    async updateReport(reportedId, count, reportLists){
        const mongooseReport = await MongooseReport.findOneAndUpdate({ reportedId: reportedId }, { count: count , $push: { reportedList: reportLists } }, {new:true});
        return new Report(mongooseReport._id, mongooseReport.reportedId, mongooseReport.count, mongooseReport.reportedList);
    }
    
    async find(limit, page, sort){
        // const mongooseReport = await MongooseReport.find().sort(sort).skip((page -1) * limit).limit(limit);
        // return mongooseReport.map((mongooseReport) => {
        //     return new Report(mongooseReport._id, mongooseReport.reportedId, mongooseReport.count, mongooseReport.reportedList);
        // });
        const [ { paginatedResult, totalCount }] = await MongooseReport.aggregate([
            {
                $facet: {
                    "paginatedResult": [
                        { $match: {}},
                        { $skip: (page - 1) * limit},
                        { $limit: limit},
                        { $sort: sort}
                    ],
                    "totalCount": [
                        { $match: {}},
                        { $count: 'totalCount' }
                    ]
                }
            }
        ]);
        await MongooseReport.populate(paginatedResult, {path: "reportedId reportedList.reporterId", select: 'firstName lastName phone'});

        // if data not found return empty array and total 0
        if (paginatedResult.length === 0 || totalCount.length === 0) { return { list: paginatedResult, total: 0}}
        return {
            list: paginatedResult.map((mongooseReport) => {
                return new Report(mongooseReport._id, mongooseReport.reportedId, mongooseReport.count, mongooseReport.reportedList);
            }),
            total: totalCount[0].totalCount
        };
    }

    async delete(reportId) {
        return await MongooseReport.findOneAndDelete({_id: reportId});
    }

    async searchById(id) {
        return await MongooseReport.findOne({_id:id}).populate("reportedId reportedList.reporterId", "firstName lastName phone");
    }

}