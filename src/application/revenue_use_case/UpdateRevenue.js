'use strict'

const MongooseRevenue = require("../../infrastructure/orm/mongoose/schemas/Revenue");
const Validation = require("../revenue_use_case/Validation");


module.exports = async (revenueId, date, income, { revenueRepository } ) => {

    // Input Validation
    await Validation.validateUpdate(revenueId, date, income);

    //calling repository implementation
    const previousIncome = await MongooseRevenue.findOne({ date: new Date(date)});
    income = income + previousIncome.totalIncome;
    return revenueRepository.update(revenueId, income);
}