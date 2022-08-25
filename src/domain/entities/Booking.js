'use strict'

module.exports = class {
    constructor(bookingId = null, propertyId, userId, checkInDate, checkOutDate, pricePerDay, pricePerStay, bookingDate, isAvailable) {
        this.bookingId = bookingId;
        this.propertyId = propertyId;
        this.userId = userId;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.pricePerDay = pricePerDay;
        this.pricePerStay = pricePerStay;
        this.bookingDate = bookingDate;
    }
};