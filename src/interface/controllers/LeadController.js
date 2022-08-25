'use strict';

const Boom = require('@hapi/boom');

const CreateLead = require('../../application/lead_usecase/CreateLead');
const DeleteLead = require('../../application/lead_usecase/DeleteLead');
const GetLead = require('../../application/lead_usecase/GetLead');
const ListLeads = require('../../application/lead_usecase/ListLead');
const UpdateLead = require('../../application/lead_usecase/UpdateLead');
const SearchByPhone = require('../../application/lead_usecase/SearchByPhone');

module.exports = {

    async createLead(request) {

        // Context
        const serviceLocater = request.server.app.serviceLocater;

        // Input
        const { agentId, userId, propertyId, type, description } = request.payload;

        // Treatment
        var lead;
        try{
        
            lead = await CreateLead(agentId, userId, propertyId, type, description, serviceLocater);
        }catch(error){
            return Boom.boomify(error, {statusCode: 400});
        
        }

        // Output
        return {
            data: serviceLocater.leadSerializer.serialize(lead), 
            statusCode: 200
        };
    },

    async findLeads(request) {
        // Context
        const serviceLocater = request.server.app.serviceLocater;
        const limit = request.query.limit
            ? parseInt(request.query.limit)
            :20;
        const page = request.query.page ? parseInt(request.query.page) : 1;

        // Treatment
        var lead;
        try{
            lead = await ListLeads(limit, page, serviceLocater);
        } catch(error){
            return Boom.boomify(error, {statusCode: 400});
        }

        // Output
        return { statusCode: 200, total: lead.total, data: lead.list };
    },

    async getLead(request){
        // Content 
        const serviceLocater = request.server.app.serviceLocater;

        // Input
        const leadId = request.params.id;

        // Treatment
        const lead = await GetLead(leadId, serviceLocater);

        // Output
        if(!lead){
            return Boom.notFound();
        }

        return serviceLocater.leadSerializer.serialize(lead);

    },

    async updateLead(request){
        // Content
        const serviceLocater = request.server.app.serviceLocater;

        // Input
        const  progress = request.payload.progress;
        const leadId = request.params.id;

        // Treatment
        var lead
        try{
            lead = await UpdateLead(leadId, progress, serviceLocater);
        }catch(error){
            return Boom.boomify(error, {statusCode: 400});
        }
        // Output
        return {data: serviceLocater.leadSerializer.serialize(lead), statusCode: 200};
    },

    async deleteLead(request){
        // Content
        const serviceLocater = request.server.app.serviceLocater;

        // Input
        const leadId = request.params.id;

        // Treatment
        var lead;
        try{
            lead = await DeleteLead(leadId, serviceLocater);
        }catch(error){
            return Boom.boomify(error, {statusCode:400});
        }

        // Output
        return {data: serviceLocater.leadSerializer.serialize(lead), statusCode: 200};

    },

    async searchByPhone(request) {

        //Context
        const serviceLocater = request.server.app.serviceLocater;

        //Input
        const phone = request.query.phone;

        //Treatment
        const agent = await SearchByPhone(phone, serviceLocater);

        //Output
        return {data: serviceLocater.leadSerializer.serialize(agent), statusCode: 200};
    }

}