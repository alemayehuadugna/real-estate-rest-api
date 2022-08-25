'use strict';

module.exports = ({ bookingRepository }) => {
    return bookingRepository.find();
}