'use strict';

const Boom = require('@hapi/boom');

const GetEmployee = require('../../application/employee_usecase/GetEmployee');
const CreateEmployee = require('../../application/employee_usecase/CreateEmployee');
const DeleteEmployee = require('../../application/employee_usecase/DeleteEmployee');
const UpdateRating = require('../../application/employee_usecase/UpdateRating');
const ListEmployees = require('../../application/employee_usecase/ListEmployee');

module.exports = {

    async createEmployee(request) {

        // Context
        const serviceLocater = request.server.app.serviceLocater;

        // Input
        const { firstName, lastName, phone, email, password, profilePicture } = request.payload;
        
        // Treatment
        let employee;
        try {
            employee = await CreateEmployee(firstName, lastName, phone, email, password, profilePicture, serviceLocater);
        } catch (error) {
            return Boom.boomify(error, { statusCode: 400 });
        }

        // Output
        return {data: serviceLocater.employeeSerializer.serialize(employee), statusCode: 200 };
    },

    async getEmployee(request) {

        // Context
        const serviceLocater = request.server.app.serviceLocater;

        // Input
        const employeeId = request.params.id;

        // Treatment
        let employee;
        try {
            employee = await GetEmployee(employeeId, serviceLocater);
        } catch(error) {
            return Boom.boomify(error, { statusCode: 400 })
        }

        // Output
        return {
            data: serviceLocater.employeeSerializer.serialize(employee), 
            statusCode: 200 
        };
    },


    async deleteEmployee(request, h) {
        
        // Context
        const serviceLocater = request.server.app.serviceLocater;

        // Input
        const employeeId = request.params.id;

        // Treatment
        let result;
        try {
            result = await DeleteEmployee(employeeId, serviceLocater);
        } catch (error) {
            return Boom.boomify(error, { statusCode: 200 })
        }

        // Output
        return {
            statusCode: 200,
            total: result.total,
            data: result.employee,
        };
    },

    async updateRating(request) {
        
        // Context
        const serviceLocater = request.server.app.serviceLocater;

        // Input
        const employeeId = request.params.id;
        const rate = request.payload.rate;

        // Treatment
        let employee;
        try {
            employee = await UpdateRating(employeeId, rate, serviceLocater);
        } catch (error) {
            return Boom.boomify(error, { statusCode: 400 })
        }

        // Output
        return {
            data: serviceLocater.employeeSerializer.serialize(employee), 
            statusCode: 200 
        };
    },

    async listEmployee(request) {
        console.log("Query: ", request.query)
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
            result = await ListEmployees(limit, page, searchBy, searchFor, sort, serviceLocater);
        } catch (error) {
            return Boom.boomify(error, { statusCode: 400 })
        }

        // Output
        return {
            statusCode: 200,
            total: result.total,
            data: serviceLocater.employeeSerializer.serialize(result.list),
        }
    }
}