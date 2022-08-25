'use strict';

const mongoose = require('../mongoose');
const Schema = mongoose.Schema;

const reportedListSchema = new mongoose.Schema({
    type: String,
    description: String,
    reporterId: { type: Schema.Types.ObjectId, ref: 'userSchema', required:true},
});


const reportSchema = new mongoose.Schema({
    reportedId: { type: Schema.Types.ObjectId, ref: 'userSchema', required:true},
    count: Number,
    reportedList: [reportedListSchema]
}, { timestamps: true }
);

module.exports = mongoose.model('Report', reportSchema);