'use strict'

const mongoose = require('../mongoose');

const messageSchema = new mongoose.Schema({
    conversationId: String,
    senderId: String,
    message: String,
});

module.exports = mongoose.model('Message', messageSchema);