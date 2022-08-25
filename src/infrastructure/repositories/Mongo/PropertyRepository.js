'use strict';

const Property = require('../../../domain/entities/Property');
const MongooseProperty = require('../../orm/mongoose/schemas/Property');
const PropertyRepository = require('../../../domain/repository/PropertyRepository');

module.exports = class extends PropertyRepository{

    constructor() {
        super();
    }

    async create(property) {
        const { agentId, description, pricing, address, area, bedroomCount,
             bathroomCount, garage, rooms, geoLocation, propertyImages, propertyType,
             status, rating, numberOfRaters, totalRating, furnishing, finishing, amenities } = property;
        const mongooseProperty = new MongooseProperty({ agentId, description, pricing, address, area, 
            bedroomCount, bathroomCount, garage, rooms, geoLocation,propertyImages, propertyType, 
            status, rating, numberOfRaters, totalRating, furnishing, finishing, amenities });
        
        await mongooseProperty.save();
        return new Property(mongooseProperty._id, mongooseProperty.agentId, mongooseProperty.description,
             mongooseProperty.pricing, mongooseProperty.address, mongooseProperty.area, 
             mongooseProperty.bedroomCount, mongooseProperty.bathroomCount, mongooseProperty.garage, 
             mongooseProperty.rooms, mongooseProperty.geoLocation, mongooseProperty.propertyImages, 
             mongooseProperty.propertyType, mongooseProperty.status, mongooseProperty.rating,
             mongooseProperty.numberOfRaters, mongooseProperty.totalRating,
             mongooseProperty.furnishing, mongooseProperty.finishing, mongooseProperty.amenities);
    }

    async getById(propertyId) {
        const mongooseProperty = await MongooseProperty.findById(propertyId).populate("agentId");
        // if property is not found return null
        if(!mongooseProperty){ return mongooseProperty;}
        return new Property(mongooseProperty._id, mongooseProperty.agentId, mongooseProperty.description,
            mongooseProperty.pricing, mongooseProperty.address, mongooseProperty.area, 
            mongooseProperty.bedroomCount, mongooseProperty.bathroomCount, mongooseProperty.garage, 
            mongooseProperty.rooms, mongooseProperty.geoLocation, mongooseProperty.propertyImages, 
            mongooseProperty.propertyType, mongooseProperty.status, mongooseProperty.rating,
            mongooseProperty.numberOfRaters, mongooseProperty.totalRating,
            mongooseProperty.furnishing, mongooseProperty.finishing, mongooseProperty.amenities);
    }

    async find(limit, page) {
        const mongooseProperties = await MongooseProperty.find()
                                                         .skip((page - 1) * limit)
                                                         .limit(limit);
        return mongooseProperties.map((mongooseProperty) => {
            return new Property(mongooseProperty._id, mongooseProperty.agentId, mongooseProperty.description,
                mongooseProperty.pricing, mongooseProperty.address, mongooseProperty.area, 
                mongooseProperty.bedroomCount, mongooseProperty.bathroomCount, mongooseProperty.garage, 
                mongooseProperty.rooms, mongooseProperty.geoLocation, mongooseProperty.propertyImages, 
                mongooseProperty.propertyType, mongooseProperty.status, mongooseProperty.rating,
                mongooseProperty.numberOfRaters, mongooseProperty.totalRating,
                mongooseProperty.furnishing, mongooseProperty.finishing, mongooseProperty.amenities);
        });
    }


    async update({propertyId, description, pricing, address, area, bedroomCount, bathroomCount, garage, rooms,
                 geoLocation, propertyImages, propertyType, propertyStatus, furnishing, finishing, amenities}) {
        
        const mongooseProperty = await MongooseProperty.findByIdAndUpdate(propertyId, { description, pricing, address, area, bedroomCount,
            bathroomCount, garage, rooms, geoLocation, $push: {  propertyImages: propertyImages }, propertyType, status: propertyStatus, furnishing, finishing, amenities}, {new: true}).populate('agentId');

        // if property does not exists return null
        if(!mongooseProperty) { return mongooseProperty; }

        return new Property(mongooseProperty._id, mongooseProperty.agentId, mongooseProperty.description,
            mongooseProperty.pricing, mongooseProperty.address, mongooseProperty.area, 
            mongooseProperty.bedroomCount, mongooseProperty.bathroomCount, mongooseProperty.garage, 
            mongooseProperty.rooms, mongooseProperty.geoLocation, mongooseProperty.propertyImages, 
            mongooseProperty.propertyType, mongooseProperty.status, mongooseProperty.rating,
            mongooseProperty.numberOfRaters, mongooseProperty.totalRating,
            mongooseProperty.furnishing, mongooseProperty.finishing, mongooseProperty.amenities);
    }
     
    async delete(propertyId) {
        return MongooseProperty.findOneAndDelete({_id: propertyId});
    }

    async updateRating(propertyId, rating, totalRating, numberOfRaters) {
        const mongooseProperty = await MongooseProperty.findByIdAndUpdate(propertyId, {rating, numberOfRaters, totalRating }, {new: true}); 
        return new Property(mongooseProperty._id, mongooseProperty.agentId, mongooseProperty.description,
            mongooseProperty.pricing, mongooseProperty.address, mongooseProperty.area, 
            mongooseProperty.bedroomCount, mongooseProperty.bathroomCount, mongooseProperty.garage, 
            mongooseProperty.rooms, mongooseProperty.geoLocation, mongooseProperty.propertyImages, 
            mongooseProperty.propertyType, mongooseProperty.status, mongooseProperty.rating,
            mongooseProperty.numberOfRaters, mongooseProperty.totalRating,
            mongooseProperty.furnishing, mongooseProperty.finishing, mongooseProperty.amenities);
    }

    async updateStatus(propertyId, status) {
        const mongooseProperty = await MongooseProperty.findByIdAndUpdate(propertyId, {status}, { new: true } );
        return new Property(mongooseProperty._id, mongooseProperty.agentId, mongooseProperty.description,
            mongooseProperty.pricing, mongooseProperty.address, mongooseProperty.area, 
            mongooseProperty.bedroomCount, mongooseProperty.bathroomCount, mongooseProperty.garage, 
            mongooseProperty.rooms, mongooseProperty.geoLocation, mongooseProperty.propertyImages, 
            mongooseProperty.propertyType, mongooseProperty.status, mongooseProperty.rating,
            mongooseProperty.numberOfRaters, mongooseProperty.totalRating,
            mongooseProperty.furnishing, mongooseProperty.finishing, mongooseProperty.amenities);
    }

    async filter(limit, page, filterQuery) {
        const { address, area, price, status, bedroomCount, bathroomCount, propertyType, rating } = filterQuery
        const mongooseProperties = await MongooseProperty.find({
                                                            "address.region": address.region,
                                                            "address.city": address.city,
                                                            "address.areaName": address.areaName,
                                                            area: { $gte:area[0], $lte: area[1] },
                                                            pricing: { $gte:price[0], $lte: price[1] },
                                                            status: status,
                                                            bedroomCount: bedroomCount,
                                                            bathroomCount: bathroomCount,
                                                            propertyType: propertyType,
                                                            rating: { $gte:rating[0], $lte: rating[1] }
                                                        }).skip((page - 1) * limit).limit(limit);
        return mongooseProperties.map((mongooseProperty) => {
            return new Property(mongooseProperty._id, mongooseProperty.agentId, mongooseProperty.description,
                mongooseProperty.pricing, mongooseProperty.address, mongooseProperty.area, 
                mongooseProperty.bedroomCount, mongooseProperty.bathroomCount, mongooseProperty.garage, 
                mongooseProperty.rooms, mongooseProperty.geoLocation, mongooseProperty.propertyImages, 
                mongooseProperty.propertyType, mongooseProperty.status, mongooseProperty.rating,
                mongooseProperty.numberOfRaters, mongooseProperty.totalRating,
                mongooseProperty.furnishing, mongooseProperty.finishing, mongooseProperty.amenities);
        });
    }

    async updatePropertyImages(propertyImages, propertyId) {
        const mongooseProperty = await MongooseProperty.findByIdAndUpdate(propertyId, { propertyImages }, { new: true});
        return new Property(mongooseProperty._id, mongooseProperty.agentId, mongooseProperty.description,
            mongooseProperty.pricing, mongooseProperty.address, mongooseProperty.area, 
            mongooseProperty.bedroomCount, mongooseProperty.bathroomCount, mongooseProperty.garage, 
            mongooseProperty.rooms, mongooseProperty.geoLocation, mongooseProperty.propertyImages, 
            mongooseProperty.propertyType, mongooseProperty.status, mongooseProperty.rating,
            mongooseProperty.numberOfRaters, mongooseProperty.totalRating,
            mongooseProperty.furnishing, mongooseProperty.finishing, mongooseProperty.amenities);
    }

    async removePropertyImage(images, propertyId) {
        const mongooseProperty = await MongooseProperty.findByIdAndUpdate(propertyId, { $pull: { propertyImages: images }}, { new: true});
        return new Property(mongooseProperty._id, mongooseProperty.agentId, mongooseProperty.description,
            mongooseProperty.pricing, mongooseProperty.address, mongooseProperty.area, 
            mongooseProperty.bedroomCount, mongooseProperty.bathroomCount, mongooseProperty.garage, 
            mongooseProperty.rooms, mongooseProperty.geoLocation, mongooseProperty.propertyImages, 
            mongooseProperty.propertyType, mongooseProperty.status, mongooseProperty.rating,
            mongooseProperty.numberOfRaters, mongooseProperty.totalRating,
            mongooseProperty.furnishing, mongooseProperty.finishing, mongooseProperty.amenities);
    }
}