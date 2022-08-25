'use strict';

const Boom = require('@hapi/boom');

const getTotalCount = require('../../application/totalCount_usecase/getTotalCount');
const createTotalCount = require('../../application/totalCount_usecase/createTotalCount');

module.exports = {

    async getTotalCount(request) {

        //Content
        const serviceLocater = request.server.app.serviceLocater;

        //Treatment
        var totalCount;
        try{
            totalCount = await getTotalCount(serviceLocater);
        } catch(error) {
            return Boom.boomify(error, {statusCode: 400});
        }

        //Output
        return {data: serviceLocater.totalCountSerializer.serialize(totalCount), statusCode: 200};

    },

    async createTotalCount(request) {

        // Context
        const serviceLocater = request.server.app.serviceLocater;

        // Treatment
        let totalCount;
        try {
            totalCount = await createTotalCount(serviceLocater);
        } catch (error) {
            return Boom.boomify(error, { statusCode: 400});
        }

        return {data: serviceLocater.totalCountSerializer.serialize(totalCount), statusCode: 200};
    }
}