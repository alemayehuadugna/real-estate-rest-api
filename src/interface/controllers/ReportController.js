'use strict'

const Boom = require('@hapi/boom');

const CreateReport = require('../../application/report_usecase/CreateReport');
const ListReports = require('../../application/report_usecase/ListReports');
const DeleteReport = require('../../application/report_usecase/DeleteReport');
const SearchById = require('../../application/report_usecase/SearchById');

module.exports = {
    
    async createReport(request) {

        //Content
        const serviceLocater = request.server.app.serviceLocater;

        //Input
        const { reportedId, type, description } = request.payload;
        const reporterId = request.params.reporterId;

        // Treatment
        var report;
        try{
            report = await CreateReport( reporterId, reportedId, type, description , serviceLocater);
        } catch (error) {
            return Boom.boomify(error, {statusCode: 400}); 
        }

        // Output
        return serviceLocater.reportSerializer.serialize(report);
    },

    async findReports(request) {

        //Context
        const serviceLocater = request.server.app.serviceLocater;
        const sort= {};
        if(request.query.sortBy){
            const str = request.query.sortBy.split(':');
            sort[str[0]] = str[1] === 'desc' ? -1:1;
        }
        const limit = request.query.limit
            ? parseInt(request.query.limit)
            :20;
        const page = request.query.page ? parseInt(request.query.page) : 1;

        //Treatment
        var report;
        try{
            report = await ListReports(limit, page, sort, serviceLocater);
        } catch (error){
            return Boom.boomify(error, {statusCode: 400});  
        }

        //Output
        return { statusCode: 200, total: report.total, data: report.list };
    }, 

    async searchById(request) {

        //context
        const serviceLocater = request.server.app.serviceLocater;

        //Input
        const id = request.params.id;

        //Treatment
        const report = await SearchById(id, serviceLocater);

        //Output
        return {data: serviceLocater.reportSerializer.serialize(report), statusCode: 200};
    },

    async deleteReport(request) {
        //context
        const serviceLocater = request.server.app.serviceLocater;

        //Input
        const reportId = request.params.id;

        //Treatment
        var report;
        try {
            report = await DeleteReport(reportId, serviceLocater);
        }catch(error){
            return Boom.boomify(error, {statusCode: 400});
        }

        //Output
        return {data: serviceLocater.reportSerializer.serialize(report), statusCode: 200};
    }
}