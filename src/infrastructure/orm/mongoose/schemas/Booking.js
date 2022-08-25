'use strict';

const mongoose = require('../mongoose');

const bookingSchema = new mongoose.Schema({
    propertyId: String,
    userId: String,
    checkInDate: Date,
    checkOutDate: Date,
    pricePerDay: Number,
    pricePerStay: Number,
    bookingDate: Date,
}, { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);