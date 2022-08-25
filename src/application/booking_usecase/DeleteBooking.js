'use strict';

module.exports = async (bookingId, {bookingRepository}) => {
    const book = await bookingRepository.delete(bookingId);
    // if booking does not exists throw error
    if (!book) { throw new Error('Booking does not exists'); }
    return book;
}