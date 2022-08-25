'use strict';

const _serializeSingleBooking = (booking) => {
    return {
        'booking-id': booking.bookingId,
        'property-id': booking.propertyId,
        'user-id': booking.userId,
        'check-in-date': booking.checkInDate,
        'check-out-date': booking.checkOutDate,
        'price-per-day': booking.pricePerDay,
        'price-per-stay': booking.pricePerStay,
        'booking-date': booking.bookingDate,
    };
};

module.exports = class {

    serialize(data) {
        if (!data) {
            throw new Error('Expect data to be not undefined nor null');
        }
        if (Array.isArray(data)) {
            return data.map(_serializeSingleBooking);
        }
        return _serializeSingleBooking(data);
    }
}