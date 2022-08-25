'use strict';

const _serializeSingleProperty = (property) => {
    return {
        'id': property.propertyId,
        'agent': {
            'id': property.agentId._id,
            'fullName': property.agentId.firstName + ' ' + property.agentId.lastName,
            'phone': property.agentId.phone,
            'email': property.agentId.email,
            'profilePicture': property.agentId.profilePicture
        },
        'description': property.description,
        'pricing': property.pricing,
        'address': property.address,
        'area': property.area,
        'bedroomCount': property.bedroomCount,
        'bathroomCount': property.bathroomCount,
        'garage': property.garage,
        'rooms': property.rooms,
        'geoLocation': {
            'long': property.geoLocation.long,
            'lat': property.geoLocation.lat
        },
        'images': property.propertyImages,
        'propertyType': property.propertyType,
        'propertyStatus': property.status,
        'rating': property.rating,
        'furnishing': property.furnishing,
        'finishing': property.finishing,
        'amenities': property.amenities,
    }
}

const _serializeMultipleProperty = (property) => {
    return {
        'id': property.propertyId,
        'description': property.description,
        'pricing': property.pricing,
        'address': {
            region:  property.address.region,
            city: property.address.city,
            subcity: property.address.subcity,
            areaName: property.address.areaName
        },
        'rating': property.rating,
    }
}


module.exports = class {

    serialize(data) {
        if(!data) {
            throw new Error('Expect data to be not undefined nor null');
        }
        if (Array.isArray(data)) {
            return data.map(_serializeMultipleProperty);
        }
        return _serializeSingleProperty(data);
    }
}