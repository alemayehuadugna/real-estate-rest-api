'use strict';

const Booking = require('../../../domain/entities/Booking');
const MongooseBooking = require('../../orm/mongoose/schemas/Booking');
const BookingRepository = require('../../../domain/repository/BookingRepository');

module.exports = class extends BookingRepository {

    constructor() {
        super();
    }

    async create(booking) {
        const {propertyId, userId, checkInDate, checkOutDate, pricePerDay, pricePerStay, bookingDate} = booking;
        const mongooseBooking = new MongooseBooking({propertyId, userId, checkInDate, checkOutDate, pricePerDay, pricePerStay, bookingDate});
        await mongooseBooking.save();
        return new Booking(mongooseBooking._id, mongooseBooking.propertyId, mongooseBooking.userId, mongooseBooking.checkInDate,
             mongooseBooking.checkOutDate, mongooseBooking.pricePerDay, mongooseBooking.pricePerStay, mongooseBooking.bookingDate);
    }

    async getById(bookingId) {
        const mongooseBooking = await MongooseBooking.findById(bookingId);
        // if booking does not exists return null
        if (!mongooseBooking) { return mongooseBooking; }
        return new Booking(mongooseBooking._id, mongooseBooking.propertyId, mongooseBooking.userId, mongooseBooking.checkInDate,
            mongooseBooking.checkOutDate, mongooseBooking.pricePerDay, mongooseBooking.pricePerStay, mongooseBooking.bookingDate);
    }

    async updateCheck(bookingId, checkInDate, checkOutDate) {
        const mongooseBooking = await MongooseBooking.findByIdAndUpdate(bookingId, {checkInDate, checkOutDate}, {new: true});
        // if booking is null return null
        if (!mongooseBooking) { return mongooseBooking; }
        return new Booking(mongooseBooking._id, mongooseBooking.propertyId, mongooseBooking.userId, mongooseBooking.checkInDate,
            mongooseBooking.checkOutDate, mongooseBooking.pricePerDay, mongooseBooking.pricePerStay, mongooseBooking.bookingDate);
    }

    async find() {
        const mongooseBookings = await MongooseBooking.find();
        return mongooseBookings.map((mongooseBooking) => {
            return new Booking(mongooseBooking._id, mongooseBooking.propertyId, mongooseBooking.userId, mongooseBooking.checkInDate,
                mongooseBooking.checkOutDate, mongooseBooking.pricePerDay, mongooseBooking.pricePerStay, mongooseBooking.bookingDate);
        })
    }

    async delete(bookingId) {
        return MongooseBooking.findByIdAndRemove({_id: bookingId});
    }
}