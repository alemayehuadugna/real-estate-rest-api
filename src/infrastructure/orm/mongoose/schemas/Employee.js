
const mongoose = require('../mongoose');
const User = require('./User');


const Employee = User.discriminator('Employee', new mongoose.Schema({
    totalRating: Number,
    numberOfRaters: Number,
    rating: Number,
  }),
);

module.exports = mongoose.model('Employee');