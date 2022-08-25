'use strict';

const mongoose = require('../mongoose');

const conversationSchema = new mongoose.Schema({
    members: Array
});

module.exports = mongoose.model('Conversation', conversationSchema);