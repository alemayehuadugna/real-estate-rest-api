'use strict'

module.exports = class {
    constructor(propertyId = null, agentId, description, pricing, address, area, bedroomCount, bathroomCount, garage, rooms, 
                geoLocation, propertyImages, propertyType, status,  rating, numberOfRaters, totalRating, furnishing, finishing, amenities) {
        this.propertyId = propertyId;
        this.agentId = agentId;
        this.description = description;
        this.pricing =  pricing;
        this.address = address;
        this.area = area;
        this.bedroomCount = bedroomCount;
        this.bathroomCount = bathroomCount;
        this.garage = garage
        this.rooms = rooms;
        this.geoLocation = geoLocation;
        this.propertyImages = propertyImages;
        this.propertyType = propertyType;
        this.status = status;
        this.rating = rating;
        this.numberOfRaters = numberOfRaters;
        this.totalRating = totalRating;
        this.furnishing = furnishing;
        this.finishing = finishing;
        this.amenities = amenities;
        
    }
};