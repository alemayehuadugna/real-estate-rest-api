'use strict';

const mongoose = require('../mongoose');

const totalCountSchema = new mongoose.Schema({
    totalUser: Number,
    totalEmployee: Number,
    totalAgent: Number,
    totalLead: Number,
    totalProperty: Number,
    totalFeedback: Number,
    totalReport: Number
}, { 
    timestamps: true,
    capped: {
        size: 5120,
        max: 1
    }
 }
);

module.exports = mongoose.model('TotalCount', totalCountSchema);