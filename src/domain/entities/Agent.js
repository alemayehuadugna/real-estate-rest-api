'use strict'

const User = require('../entities/User');

module.exports = class extends User {

    constructor(id = null, firstName, lastName, phone, email, password, role, profilePicture, salesDone, rentDone, totalRating, numberOfRaters, rating) {
        super(id , firstName, lastName, phone, email, password, role, profilePicture);
        this.salesDone = salesDone;
        this.rentDone = rentDone;
        this.totalRating = totalRating;
        this.numberOfRaters = numberOfRaters;
        this.rating = rating;
    }
};