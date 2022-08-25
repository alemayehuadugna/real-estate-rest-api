"use strict";

const Property = require("../../domain/entities/Property");
const Address = require("../../domain/entities/Address");
const Room = require("../../domain/entities/Room");
const GeoLocation = require("../../domain/entities/GeoLocation");

module.exports = async ( agentId, description, pricing, { region, city, subcity, kebele, houseNumber, areaName, propertyName, floorNumber },
						 area, bedroomCount, bathroomCount, garage, rooms, { long, lat }, propertyImages, propertyType, propertyStatus, 
						 furnishing, finishing, amenities, { propertyRepository, agentRepository, totalCountRepository, imageRepository }) => {
							 
	// check if the agent exists in the system
	const agent = await agentRepository.getAgentById(agentId);
	if (!agent) { throw new Error("Agent does not exists"); }

	let savedPropertyImages = [];

	const propertyAddress = new Address( region, city, subcity, kebele, houseNumber, areaName, propertyName, floorNumber );
	const propertyLocation = new GeoLocation(parseFloat(long), parseFloat(lat));

	const property = new Property(null, agentId, description, pricing, propertyAddress, area, bedroomCount, bathroomCount,
								 garage, rooms, propertyLocation, savedPropertyImages, propertyType, propertyStatus,
								 0, 0, 0, furnishing, finishing, amenities);

	// increment number of property in total count
	const totalCount = await totalCountRepository.get();
	const totalCountId = totalCount.totalCountId;
	var totalProperty = totalCount.totalProperty;
	totalProperty = totalProperty + 1;
	totalCountRepository.updateTotalProperty(totalCountId, totalProperty);

	// create property
	const propertyWithoutImage = await propertyRepository.create(property);
	savedPropertyImages = await imageRepository.upload( propertyImages, propertyWithoutImage.propertyId );
	
	return propertyRepository.updatePropertyImages(savedPropertyImages, propertyWithoutImage.propertyId);
};
