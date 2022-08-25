'use strict';

module.exports = async (bookingId, {bookingRepository}) => {
    const booking = await bookingRepository.getById(bookingId);
    // if booking does not exists throw error
    if (!booking) { throw new Error('Booking does not exists'); }
    return booking;
}