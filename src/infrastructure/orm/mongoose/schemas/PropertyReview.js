'use strict';

const mongoose = require('../mongoose');

const PropertyReviewSchema = new mongoose.Schema({
    propertyId: String,
    userId: String,
    comment: String,
    rating: Number,
});

module.exports = mongoose.model('PropertyReview', PropertyReviewSchema  );