'use strict';

const Moment = require('moment');
const Booking = require('../../domain/entities/Booking');

module.exports = async (propertyId, userId, checkInDate, checkOutDate, { bookingRepository, userRepository, propertyRepository }) => {
    let checkIn = Moment(checkInDate);
    let checkOut = Moment(checkOutDate);
    // 1 validate if checkInDate and checkOutDate are valid dates
    if (!checkIn.isValid() || !checkOut.isValid()) { throw new Error('Invalid date inserted'); }
    // 2 check if the property exists in the system
    const property = await propertyRepository.getById(propertyId);
    if (!property) { throw new Error('Property does not exists'); }
    // 3 check if the user exists in the system
    const user = await userRepository.getById(userId);
    if (!user) { throw new Error('User does not exists'); }
    // 4 verify if the required property can be booked for the given date
    // 5 calculate date difference between checkIn and checkOut
    let stayDays = checkOut.diff(checkIn, 'days');
    // 6 calculate pricePerStay ( date difference * pricePerDay )
    const pricePerStay = property.pricing * stayDays;
    // 7 insert the required parameters and save 
    const book = new Booking(null, propertyId, userId, checkInDate, checkOutDate, property.pricing, pricePerStay, Date.now());
    return bookingRepository.create(book);
}