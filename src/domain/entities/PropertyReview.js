'use strict'

module.exports = class {
    constructor(reviewId = null, propertyId, userId, comment, rating) {
        this.reviewId = reviewId;
        this.propertyId = propertyId;
        this.userId = userId;
        this.comment = comment;
        this.rating = rating;
    }
};