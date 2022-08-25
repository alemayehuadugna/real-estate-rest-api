'use strict';

const Boom = require('@hapi/boom');

const CreateProperty = require('../../application/property_usecase/CreateProperty');
const DeleteProperty = require('../../application/property_usecase/DeleteProperty');
const GetProperty = require('../../application/property_usecase/GetProperty');
const ListProperties = require('../../application/property_usecase/ListProperty');
const UpdateProperty = require('../../application/property_usecase/UpdateProperty');
const UpdateRating = require('../../application/property_usecase/UpdateRating');
const UpdateStatus = require('../../application/property_usecase/UpdateStatus');
const FilterProperties = require('../../application/property_usecase/FilterProperties');
const fs = require('fs');
const Path = require('path');

module.exports = {

    async createProperty(request) {

        // Context
        const serviceLocater = request.server.app.serviceLocater

        // // Input
        let { description, pricing, address_region, address_city, address_subcity,
            address_kebele, address_houseNumber, address_areaName, address_propertyName, address_floorNumber,
            area, amenities, bedroomCount, bathroomCount, garage, rooms, geoLocation_long, geoLocation_lat, propertyImages, 
            propertyType, propertyStatus, furnishing, finishing, agentId  } = request.payload;
        let address = { region: address_region, city: address_city, subcity: address_subcity, 
                        kebele: address_kebele, houseNumber: address_houseNumber, areaName: address_areaName,
                        propertyName: address_propertyName, floorNumber: address_floorNumber };
        let geoLocation = { long: geoLocation_long, lat: geoLocation_lat };

        // Treatment
        let property;
        try {
            property = await CreateProperty(agentId, description, parseFloat(pricing), address, parseFloat(area), parseInt(bedroomCount),
                parseInt(bathroomCount), parseInt(garage), rooms, geoLocation, propertyImages, propertyType, propertyStatus,
                furnishing, finishing, amenities, serviceLocater );
        } catch (error) {
            return Boom.boomify(error, {statusCode: 400});
        }

        return {
            statusCode: 200,
            data: serviceLocater.propertySerializer.serialize(property)
        }
    },

    async getProperties(request) {
        // Context
        const serviceLocater = request.server.app.serviceLocater;

        // Input
        const limit = request.query.limit ? parseInt(request.query.limit) :20;
        const page = request.query.page ? parseInt(request.query.page) : 1;

        // Treatment
        var result;
        try{
            result = await ListProperties(limit, page, serviceLocater);
        } catch (error) {
            return Boom.boomify(error, {statusCode: 400});
        }

        // Output
        return {
            statusCode: 200,
            total: result.total,
            data: serviceLocater.propertySerializer.serialize(result.list)
        };
    },

    async getProperty(request) {

        // Context
        const serviceLocater = request.server.app.serviceLocater;

        // Input
        const propertyId = request.params.id;

        // Treatment
        let property;
        try {
            property = await GetProperty(propertyId, serviceLocater);
        } catch (error) {
            return Boom.boomify(error, {statusCode: 400});
        }

        // Output
        return {
            statusCode: 200,
            data: serviceLocater.propertySerializer.serialize(property)
        }
    },

    async deleteProperty(request, h) {

        // Context
        const serviceLocater = request.server.app.serviceLocater;

        // Input
        const propertyId = request.params.id;

        // Treatment
        let count;
        try {
            count = await DeleteProperty(propertyId, serviceLocater);
        } catch (error) {
            return Boom.boomify(error, {statusCode: 400});
        }

        // Output
        return {
            statusCode: 200,
            total: count
        };
    },

    async updateProperty(request) {

        // Context
        const serviceLocater = request.server.app.serviceLocater;

        // Input
        const propertyId = request.params.id;

        let { description, pricing, address_region, address_city, address_subcity,
            address_kebele, address_houseNumber, address_areaName, address_propertyName, address_floorNumber,
            area, amenities, bedroomCount, bathroomCount, garage, rooms, geoLocation_long, geoLocation_lat, propertyImages, 
            propertyType, propertyStatus, furnishing, finishing, agentId, removedImages  } = request.payload;
        
        let address = { region: address_region, city: address_city, subcity: address_subcity, 
            kebele: address_kebele, houseNumber: address_houseNumber, areaName: address_areaName,
            propertyName: address_propertyName, floorNumber: address_floorNumber };    
        let geoLocation = { long: parseFloat(geoLocation_long), lat: parseFloat(geoLocation_lat) };

        let property;
        // Treatment
        try {
            property = await UpdateProperty(propertyId, description,  parseFloat(pricing), address, parseFloat(area), parseInt(bedroomCount), parseInt(bathroomCount), 
                parseInt(garage), rooms, geoLocation, propertyImages, propertyType, propertyStatus, furnishing, finishing, amenities, removedImages, serviceLocater);
        } catch (error) {
            return Boom.boomify(error, {statusCode: 400});
        }
        
        // Output
        return {
            statusCode: 200,
            data: property
        }
    },

    async updateRating(request){
        //Context
        const serviceLocater = request.server.app.serviceLocater;

        //Input
        const propertyId = request.params.id;
        const rate = request.payload.rate;

        //Treatment
        var property;
        try{
            property = await UpdateRating(propertyId, rate, serviceLocater);
        }catch (error) {
            return Boom.boomify(error, {statusCode: 400});
        }

        //Output
        return serviceLocater.propertySerializer.serialize(property);
    },

    async updateStatus(request) {
        // Context
        const serviceLocater = request.server.app.serviceLocater;

        // Input
        const propertyId = request.params.id;
        const status = request.payload.status;

        // Treatment
        var property;
        try{
            property = await UpdateStatus(propertyId, status, serviceLocater);
        }catch (error) {
            return Boom.boomify(error, {statusCode: 400});
        }

        // Output
        return serviceLocater.propertySerializer.serialize(property);
    },

    async filterProperties(request) {
        // Context
        const serviceLocater = request.server.app.serviceLocater;

        // Input
        const { address, area, price, status, bedroomCount, bathroomCount, propertyType, rating, limit, page} = request.payload;
        // console.log("Payload: ", request.payload);
        // Treatment
        let result;
        try {
            result = await FilterProperties(limit, page, address, area, price, status, bedroomCount, bathroomCount, propertyType, rating, serviceLocater);
        } catch (error) {
            return Boom.boomify(error, { statusCode: 400 });
        }
        // console.log(result.list);
        return {
            statusCode: 200,
            total: result.total,
            data: serviceLocater.propertySerializer.serialize(result.list)
        };
    },

    async uploadPropertyImages(request, reply) {
        const req = request.payload;
        const files = req.file_list;
        try {
            // console.log(files);
            files.forEach(file => {
                let name = file.hapi.filename;
                let path = 'src/infrastructure/resource/uploads/' + name;
                let fileStream = fs.createWriteStream(path);
                
                fileStream.on('error', (err) => console.error(err))
                
                file.pipe(fileStream);

                file.on('end', (err) => {
                    const ret = {
                        filename: file.hapi.filename,
                        headers: file.hapi.headers
                    }
                    return JSON.stringify(ret);
                })

            })
            return { statusCode: 200}
        } catch (err) {
            return Boom.boomify(err, { statusCode: 400 });
        }
    },
}