'use strict';

const Moment = require('moment');

module.exports = async (bookingId, checkInDate, checkOutDate, {bookingRepository}) => {
    let checkIn = Moment(checkInDate);
    let checkOut = Moment(checkOutDate);
    // validate if checkInDate and checkOutDate are valid dates
    if (!checkIn.isValid() || !checkOut.isValid()) { throw new Error('Invalid date inserted'); }
    // check if booking exits in the system
    const booking = await bookingRepository.updateCheck(bookingId, checkInDate, checkOutDate);
    if (!booking) { throw new Error('Booking does not exists'); }
    return booking;
}