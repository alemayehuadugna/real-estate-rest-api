'use strict'

const User = require('./User');

module.exports = class extends User {

    constructor(id = null, firstName, lastName, phone, email, password, role, profilePicture, totalRating, numberOfRaters, rating) {
        super(id , firstName, lastName, phone, email, password, role, profilePicture);
        this.totalRating = totalRating;
        this.numberOfRaters = numberOfRaters;
        this.rating = rating;
    }
};