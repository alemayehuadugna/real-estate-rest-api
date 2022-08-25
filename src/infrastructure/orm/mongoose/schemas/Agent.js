
const mongoose = require('../mongoose');
const User = require('./User');


const Agent = User.discriminator('Agent', new mongoose.Schema({
    salesDone: Number,
    rentDone: Number,
    totalRating: Number,
    numberOfRaters: Number,
    rating: Number,
  }),
);

module.exports = mongoose.model('Agent');