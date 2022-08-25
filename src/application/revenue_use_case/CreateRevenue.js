'use strict';

const Revenue = require ('../../domain/entities/Revenue');
const Validation = require('../revenue_use_case/Validation');

module.exports = async (totalIncome, date, { revenueRepository }) => {

    // Input Validation
    await Validation.validateCreateInput(totalIncome, date);

    // calling repository implementation
    const revenue = new Revenue(null, totalIncome, date);
    return revenueRepository.create(revenue);
}