'use strict';

const Boom = require('@hapi/boom');

const NewBooking = require('../../application/booking_usecase/NewBooking');
const GetBooking = require('../../application/booking_usecase/GetBooking');
const UpdateCheck = require('../../application/booking_usecase/UpdateCheck');
const ListBooking = require('../../application/booking_usecase/ListBooking');
const DeleteBooking = require('../../application/booking_usecase/DeleteBooking');

module.exports = {

    async newBooking(request) {
        // Context 
        const serviceLocater = request.server.app.serviceLocater;
        
        // Input
        const {propertyId, userId, checkInDate, checkOutDate } = request.payload;
        console.log('CheckOutDate: ', checkOutDate);
        // Treatment
        var booking;
        try {
            booking = await NewBooking(propertyId, userId, checkInDate, checkOutDate, serviceLocater);
        } catch (error) {
            return Boom.boomify(error, {statusCode: 400});
        }

        // Output
        return serviceLocater.bookingSerializer.serialize(booking);
    },

    async getBooking(request) {
        // Context
        const serviceLocater = request.server.app.serviceLocater;

        // Input
        const bookingId = request.params.id;

        // Treatment
        let booking;
        try {
            booking = await GetBooking(bookingId, serviceLocater);
        } catch (error) {
            return Boom.boomify(error, {statusCode: 400});
        }

        // Output
        return serviceLocater.bookingSerializer.serialize(booking);
    },

    async updateCheck(request) {
        // Context
        const serviceLocater = request.server.app.serviceLocater;

        // Input
        const bookingId = request.params.id;
        const {checkInDate, checkOutDate} = request.payload;

        //Treatment
        let booking;
        try {
            booking = await UpdateCheck(bookingId, checkInDate, checkOutDate, serviceLocater);
        } catch (error) {
            return Boom.boomify(error, {statusCode: 400});
        }
        
        // Output
        return serviceLocater.bookingSerializer.serialize(booking);
    },

    async listBookings(request) {
        // Context
        const serviceLocater = request.server.app.serviceLocater;

        // Input
        const bookings = await ListBooking(serviceLocater);

        // Output
        return bookings.map(serviceLocater.bookingSerializer.serialize);
    },

    async deleteBooking(request, h) {
        // Context
        const serviceLocater = request.server.app.serviceLocater;

        // Input
        const bookingId = request.params.id;

        // Treatment
        try {
            await DeleteBooking(bookingId, serviceLocater);
        } catch (error) {
            return Boom.boomify(error, {statusCode: 400 });
        }

        // Output
        return h.response().code(204);
    }

    
}