'use strict'

const Revenue = require('../../../domain/entities/Revenue');
const MongooseRevenue = require('../../orm/mongoose/schemas/Revenue');
const RevenueRepository = require('../../../domain/repository/RevenueRepository');

module.exports = class extends RevenueRepository{

    constructor(){
        super();
    }

    async create(revenue){
        var { totalIncome, date } = revenue;
        const mongooseRevenue = new MongooseRevenue({totalIncome, date});
        await mongooseRevenue.save();

        return new Revenue(mongooseRevenue._id, mongooseRevenue.totalIncome, mongooseRevenue.date );
    }

    async getByDate(date){
        const mongooseRevenue = await MongooseRevenue.findOne({ date: new Date(date)});
        return new Revenue(mongooseRevenue._id, mongooseRevenue.totalIncome, mongooseRevenue.date);
    }

    async update(revenueId,income){
        const mongooseRevenue = await MongooseRevenue.findOneAndUpdate(revenueId, {totalIncome: income}, {new: true});
        return new Revenue(mongooseRevenue._id, mongooseRevenue.totalIncome, mongooseRevenue.date);
    }
}