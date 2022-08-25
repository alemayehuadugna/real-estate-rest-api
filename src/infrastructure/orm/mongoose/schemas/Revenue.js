'use strict';

const mongoose = require('../mongoose');

const RevenueSchema = new mongoose.Schema({
    totalIncome: Number,
    date: Date , 
});

module.exports = mongoose.model('Revenue', RevenueSchema);