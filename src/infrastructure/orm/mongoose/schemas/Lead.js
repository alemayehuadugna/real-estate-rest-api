'use strict';

const mongoose = require('../mongoose');
const Schema = mongoose.Schema;

const leadSchema = new mongoose.Schema({
    agentId: { type: Schema.Types.ObjectId, ref: 'Agent', required:true},
    userId: { type: Schema.Types.ObjectId, ref: 'userSchema', required:true},
    propertyId: String,
    type: String,
    startDate: Date,
    endDate: Date,
    progress: String,
    description: String,
});

module.exports = mongoose.model('Lead', leadSchema);