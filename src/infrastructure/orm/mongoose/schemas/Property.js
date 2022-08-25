'use strict';

const mongoose = require('../mongoose');
const Schema = mongoose.Schema;

const addressSchema = new mongoose.Schema({
    region: String,
    city: String,
    subcity: String,
    kebele: String,
    houseNumber: String,
    areaName: String,
    propertyName: String,
    floorNumber: String,
});

const roomSchema = new mongoose.Schema({
    roomName: String,
    length: Number,
    width: Number,
    area: Number,
    image: String
});

const geoLocationSchema = new mongoose.Schema({
    long: Number,
    lat: Number
});

const propertySchema = new mongoose.Schema({
    agentId: { type: Schema.Types.ObjectId, ref: 'Agent' },
    description: String,
    pricing: Number,
    address: addressSchema,
    area: Number,
    bedroomCount: Number,
    bathroomCount: Number,
    garage: Number,
    rooms: [roomSchema],
    geoLocation: geoLocationSchema,
    propertyImages: Array,
    propertyType: String,
    status: String,
    rating: Number,
    numberOfRaters: Number,
    totalRating: Number,
    furnishing: Boolean,
    finishing: Boolean,
    amenities: Array, 
});

module.exports = mongoose.model('Property', propertySchema);