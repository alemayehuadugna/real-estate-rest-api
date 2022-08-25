'use strict';

const mongoose = require('../mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new mongoose.Schema({
    subscription: Object,
    payload: Object,
    notificationList: Array,
},  { timestamps: true }
);

module.exports = mongoose.model('Notification', notificationSchema);