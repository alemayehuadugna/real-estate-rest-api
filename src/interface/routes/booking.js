'use strict';

const BookingController = require('../controllers/BookingController');
const { newBookingSchema, bookingIdSchema, bookingUpdateSchema } = require('../validation/booking');

module.exports = {
    name: 'bookings',
    version: '1.0.0',
    register: async (server) => {

        server.route([
            {
                method: 'POST',
                path: '/users/booking',
                config: {
                    validate: {payload: newBookingSchema },
                    handler: BookingController.newBooking,
                    description: 'Let User Book a new Property',
                    tags: ['api'],
                },
            },
            {
                method: 'GET',
                path: '/users/booking/{id}',
                config: {
                    validate: { params: bookingIdSchema },
                    handler: BookingController.getBooking,
                    description: 'Get Booking by its {id}',
                    tags: ['api'],
                },
            },
            {
                method: 'PATCH',
                path: '/users/booking/{id}',
                config: {
                    validate: {
                        params: bookingIdSchema,
                        payload: bookingUpdateSchema
                    },
                    handler: BookingController.updateCheck,
                    description: 'Update CheckIn and CheckOut of Booking',
                    tags: ['api'],
                },
            },
            {
                method: 'GET',
                path: '/users/booking',
                config: {
                    handler: BookingController.listBookings,
                    description: 'Get List of Bookings',
                    tags: ['api'],
                },
            },
            {
                method: 'DELETE',
                path: '/users/booking/{id}',
                config: {
                    validate: { params: bookingIdSchema },
                    handler: BookingController.deleteBooking,
                    description: 'Delete Booking by its {id}',
                    tags: ['api'],
                },
            },
        ]);
    }
}