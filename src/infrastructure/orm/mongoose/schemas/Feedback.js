'use strict';

const mongoose = require('../mongoose');

const feedbackSchema = new mongoose.Schema({
    message: String,
    userId: String,
    name: String,

});

module.exports = mongoose.model('Feedback', feedbackSchema);