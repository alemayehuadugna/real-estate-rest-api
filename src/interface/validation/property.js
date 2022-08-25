const Joi = require('joi');

const createPropertySchema = Joi.object({
    agentId: Joi.string().min(24).max(24).required().error(new Error('invalid agent id input')),
    description: Joi.string().required().error(new Error('Invalid description input')),
    pricing: Joi.number().required().error(new Error('Invalid pricing input')),
    address: {
        region: Joi.string().required().error(new Error('Invalid region input')),
        city: Joi.string().required().error(new Error('Invalid city input')),
        subcity: Joi.string().required().error(new Error('invalid subcity input')),
        kebele: Joi.string().required().error(new Error('invalid kebele input')),
        houseNumber: Joi.string().required().error(new Error('invalid house number input')),
        areaName: Joi.string().required().error(new Error('invalid area name input')),
        propertyName: Joi.string().required().error(new Error('invalid property name input')),
        floorNumber: Joi.string().required().error(new Error('invalid floor number input'))
    },
    area: Joi.number().min(0).required().error(new Error('invalid property area input')),
    bedroomCount: Joi.number().min(0).required().error(new Error('invalid bedroom count input')),
    bathroomCount: Joi.number().min(0).required().error(new Error('invalid bathroom count input')),
    garage: Joi.number().min(0).required().error(new Error('invalid garage input')),
    rooms: Joi.array().items({
        roomName: Joi.string().required().error(new Error('invalid room name input')),
        length: Joi.number().required().error(new Error('invalid room length input')),
        width: Joi.number().required().error(new Error('invalid room width input')),
        area: Joi.number().required().error(new Error('invalid room area input')),
        image: Joi.string().error(new Error('invalid room input input')),
    }),
    geoLocation: {
        long: Joi.number().required().error(new Error('invalid geo location longitude input')),
        lat: Joi.number().required().error(new Error('invalid geo location latitude input'))
    },
    propertyImages: Joi.array().items(Joi.string().required()).required().error(new Error('invalid property images input')),
    propertyType: Joi.string().required().error(new Error('invalid property type input')),
    status: Joi.string().required().error(new Error('invalid property status input')),
    furnishing: Joi.boolean().required().error(new Error('invalid furnishing input')),
    finishing: Joi.boolean().required().error(new Error('invalid finishing input')),    
    amenities: Joi.array().items(Joi.string().required()).required().error(new Error('invalid amenities input')),
});


const propertyUpdateSchema = Joi.object({
    description: Joi.string().required().error(new Error('Invalid description input')),
    pricing: Joi.number().required().error(new Error('Invalid pricing input')),
    address: {
        region: Joi.string().required().error(new Error('Invalid region input')),
        city: Joi.string().required().error(new Error('Invalid city input')),
        subcity: Joi.string().required().error(new Error('invalid subcity input')),
        kebele: Joi.string().required().error(new Error('invalid kebele input')),
        houseNumber: Joi.string().required().error(new Error('invalid house number input')),
        areaName: Joi.string().required().error(new Error('invalid area name input')),
        propertyName: Joi.string().required().error(new Error('invalid property name input')),
        floorNumber: Joi.string().required().error(new Error('invalid floor number input'))
    },
    area: Joi.number().min(0).required().error(new Error('invalid property area input')),
    bedroomCount: Joi.number().min(0).required().error(new Error('invalid bedroom count input')),
    bathroomCount: Joi.number().min(0).required().error(new Error('invalid bathroom count input')),
    garage: Joi.number().min(0).required().error(new Error('invalid garage input')),
    rooms: Joi.array().items({
        roomName: Joi.string().required().error(new Error('invalid room name input')),
        length: Joi.number().required().error(new Error('invalid room length input')),
        width: Joi.number().required().error(new Error('invalid room width input')),
        area: Joi.number().required().error(new Error('invalid room area input')),
        image: Joi.string().error(new Error('invalid room input input')),
    }),
    geoLocation: {
        long: Joi.number().required().error(new Error('invalid geo location longitude input')),
        lat: Joi.number().required().error(new Error('invalid geo location latitude input'))
    },
    propertyImages: Joi.array().items(Joi.string().required()).required().error(new Error('invalid property images input')),
    propertyType: Joi.string().required().error(new Error('invalid property type input')),
    status: Joi.string().required().error(new Error('invalid property status input')),
    furnishing: Joi.boolean().required().error(new Error('invalid furnishing input')),
    finishing: Joi.boolean().required().error(new Error('invalid finishing input')),    
    amenities: Joi.array().items(Joi.string().required()).required().error(new Error('invalid amenities input')),
});

const propertyIdSchema = Joi.object({
    id: Joi.string().min(24).max(24).required().error(new Error('Invalid id input')),
});

const propertyRateSchema = Joi.object({
    rate: Joi.number().min(0).max(5).required().error(new Error('Invalid rate input')),
});

const propertyStatusSchema = Joi.object({
    status: Joi.string().required().error(new Error('invalid property status input')),
});

module.exports = {
    createPropertySchema,
    propertyIdSchema,
    propertyUpdateSchema,
    propertyRateSchema,
    propertyStatusSchema
}