
const mongoose = require('../mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new mongoose.Schema({
    userId: String,
    propertyId: { type: Schema.Types.ObjectId, ref: 'Property', required:true }
  });

module.exports = mongoose.model('favorite', favoriteSchema);