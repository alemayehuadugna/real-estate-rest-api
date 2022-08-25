'use strict';

const Boom = require('@hapi/boom');

const CreateRevenue = require('../../application/revenue_use_case/CreateRevenue');
const GetRevenue = require('../../application/revenue_use_case/GetRevenue');
const UpdateRevenue = require('../../application/revenue_use_case/UpdateRevenue');

module.exports = {

    async createRevenue(request) {

        // Context
        const serviceLocater = request.server.app.serviceLocater;

        // Input
        const { totalIncome, date } = request.payload;

        // Treatment
        var revenue;
        try{
            revenue = await CreateRevenue(totalIncome, date, serviceLocater);
        }catch(error){
            return Boom.boomify(error, {statusCode: 400});
        }

        // Output
        return serviceLocater.revenueSerializer.serialize(revenue);
    },

    async getRevenue(request){

        // Content
        const serviceLocater = request.server.app.serviceLocater;

        // Input
        const date = request.params.date;

        // Treatment
        const revenue = await GetRevenue(date, serviceLocater);

        // Output
        if(!revenue){
            return Boom.notFound();
        }

        return serviceLocater.revenueSerializer.serialize(revenue);
    },

    async updateRevenue(request){

        // Content
        const serviceLocater = request.server.app.serviceLocater;

        // Input
        const date = request.params.date;
        const {revenueId, income} = request.payload;

        // Treatment
        var revenue;
        try{
            revenue = await UpdateRevenue(revenueId, date, income, serviceLocater);
        }catch(error){
            return Boom.boomify(error, {statusCode: 400});
        }

        // Output
        if(!revenue){
            return Boom.notFound();
        }

        return serviceLocater.revenueSerializer.serialize(revenue);
    },
}