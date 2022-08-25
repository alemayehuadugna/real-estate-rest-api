'use strict';

const Boom = require('@hapi/boom');

const GetAgent = require('../../application/agent_usecase/GetAgent');
const CreateAgent = require('../../application/agent_usecase/CreateAgent');
const DeleteAgent = require('../../application/agent_usecase/DeleteAgent');
const UpdateRating = require('../../application/agent_usecase/UpdateRating');
const ListAgents = require('../../application/agent_usecase/ListAgent');
const FilterAgent = require('../../application/agent_usecase/FilterAgent');

module.exports = {

    async createAgent(request) {

        //Context
        const serviceLocater = request.server.app.serviceLocater;
        
        //Input
        const { firstName, lastName, phone, email, password, profilePicture } = request.payload;
        
        //Treatment
        var agent;
        try{
            agent = await CreateAgent(firstName, lastName, phone, email, password, profilePicture, serviceLocater);
        } catch (error) {
            return Boom.boomify(error, {statusCode: 400});
        }

        //Output
        return {
            data: serviceLocater.agentSerializer.serialize(agent),
            statusCode: 200
        };
    },

    async getAgent(request) {

        //Context
        const serviceLocater = request.server.app.serviceLocater;

        //Input
        const agentId = request.params.id;

        //Treatment
        let agent;
        try{
            agent = await GetAgent(agentId, serviceLocater);
        } catch (error) {
            return Boom.boomify(error, {statusCode: 400});
        }

        //Output
        return {
            data: serviceLocater.agentSerializer.serialize(agent),
            statusCode: 200
        };
    },

    async deleteAgent(request, h) {
        console.log("Got Here!")
        //Context
        const serviceLocater = request.server.app.serviceLocater;

        //Input
        const agentId = request.params.id;

        //Treatment
        let result;
        try {
            result = await DeleteAgent(agentId, serviceLocater);
        } catch (error) {
            return Boom.boomify(error, {statusCode: 400});
        }

        //Output
        return {
            statusCode: 200,
            total: result.total,
            data: result.agent,
        };
    },

    async updateRating(request) {

        //Context
        const serviceLocater = request.server.app.serviceLocater;

        //Input
        const agentId = request.params.id;
        const rating = request.payload.rating;

        //Treatment
        var agent;
        try{
            agent = await UpdateRating(agentId, rating, serviceLocater);
        } catch (error) {
            return Boom.boomify(error, {statusCode: 400}) 
        }

        //Output
        return {
            data: serviceLocater.agentSerializer.serialize(agent),
            statusCode: 200
        };
    },

    async listAgents(request) {
        console.log("Page: ", request.query.page);
        // Context
        const serviceLocater = request.server.app.serviceLocater;

        // Input
        const limit = request.query.limit ? parseInt(request.query.limit): 20;
        const page = request.query.page ? parseInt(request.query.page) : 1;

        // Treatment
        let result;
        try {
            result = await ListAgents(limit, page, serviceLocater)
        } catch (error) {
            return Boom.boomify(error, { statusCode: 400});
        }

        // Output
        return {
            statusCode: 200,
            total: result.total,
            data: serviceLocater.agentSerializer.serialize(result.list),
        }
    },

    async filterAgent(request) {

        // Context
        const serviceLocater = request.server.app.serviceLocater;

        // Input
        const limit = request.query.limit ? parseInt(request.query.limit): 10;
        const page = request.query.page ? parseInt(request.query.page) : 1;
        const searchBy = request.query.searchBy;
        const searchFor = request.query.searchFor;
        const sort = request.query.sort;

        // Treatment
        let result;
        try {
            result = await FilterAgent(limit, page, searchBy, searchFor, sort, serviceLocater)
        } catch (error) {
            return Boom.boomify(error, { statusCode: 400 });
        }

        // Output
        return { statusCode: 200, total: result.total, data: result.list };
    }
}