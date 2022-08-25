'use strict';

const Boom = require('@hapi/boom');

const ListUsers = require('../../application/user_usecase/ListUser');
const CreateUser = require('../../application/user_usecase/CreateUser');
const GetUser = require('../../application/user_usecase/GetUser');
const DeleteUser = require('../../application/user_usecase/DeleteUser');
const UpdateUser = require('../../application/user_usecase/UpdateUser');
const ChangePassword = require('../../application/user_usecase/ChangePassword');
const SearchByPhone = require('../../application/lead_usecase/SearchByPhone');
const FilterUser = require('../../application/user_usecase/FilterUser');


const VerifyAccessToken = require('../../application/user_usecase/VerifyAccessToken');


module.exports = {

    async createUser(request) {
    
        // Context
        const serviceLocater = request.server.app.serviceLocater;

        // Input
        const { firstName, lastName, phone, email, password, profilePicture } = request.payload;
        // Treatment
        var user;
        try {
            user = await CreateUser( firstName, lastName, phone, email, password, profilePicture, serviceLocater);
        } catch (error) {
            return Boom.boomify(error, {statusCode: 400 });
        }
        
        // Output
        return { 
            data: serviceLocater.userSerializer.serialize(user), 
            statusCode: 200 
        };
    },

    async listUsers(request) {

        // Context 
        const serviceLocater = request.server.app.serviceLocater;

        // Input
        const limit = request.query.limit ? parseInt(request.query.limit): 20;
        const page = request.query.page ? parseInt(request.query.page) : 1;

        // Treatment
        var result;
        try{
            result = await ListUsers(limit, page, serviceLocater);
        } catch (error){
            return Boom.boomify(error, {statusCode: 400});
        }
        

        // Output
        return { 
            statusCode: 200,
            total: result.total,
            data: serviceLocater.userSerializer.serialize(result.list)
        };
    },  

    async filterUser(request) {

        // Context
        const serviceLocater = request.server.app.serviceLocater;

        // Input
        const limit = request.query.limit ? parseInt(request.query.limit): 10;
        const page = request.query.page ? parseInt(request.query.page) : 1;
        const searchBy = request.query.searchBy;
        const searchFor = request.query.searchFor;

        // Treatment
        let result; 
        try {
            result = await FilterUser(limit, page, searchBy, searchFor, serviceLocater);
        } catch (error) {
            return Boom.boomify(error, { statusCode: 400 });
        }

        // Output
        return { statusCode: 200, total: result.total, data: result.list };
    },

    async getUser(request) {
        // Context
        const serviceLocater = request.server.app.serviceLocater;

        // Input
        const uid = request.auth.credentials.uid;
        // const { uid, scope } = VerifyAccessToken(userId, serviceLocater);
        
        // Treatment
        let user;
        try {
            user = await GetUser(uid, serviceLocater);
        } catch (error) {
            return Boom.boomify(error, {statusCode: 400});
        }

        // Output
        return { data: serviceLocater.userSerializer.serialize(user), statusCode: 200 };
    },

    async deleteUser(request) {

        // Context
        const serviceLocater = request.server.app.serviceLocater;

        // Input
        const userId = request.params.id;

        // Treatment
        let result;
        try {
            result = await DeleteUser(userId, serviceLocater);
        } catch (error) { return Boom.boomify(error, {statusCode: 400}); }

        // Output        
        return {
            statusCode: 200,
            total: result.total,
            data: result.user,
        };
    },

    async updateUser(request) {

        // Context
        const serviceLocater = request.server.app.serviceLocater;

        // Input
        const userId = request.params.id;
        const {firstName, lastName, email, profilePicture} = request.payload;

        // Treatment
        var user;
        try {
            user = await UpdateUser(userId, firstName, lastName, email, profilePicture, serviceLocater);
        } catch (error) {
            return Boom.boomify(error, {statusCode: 400});
        }

        // Output
        return { data: serviceLocater.userSerializer.serialize(user), statusCode: 200 };
    },

    async changePassword(request) {

        // Context
        const serviceLocater = request.server.app.serviceLocater;

        // Input
        const userId = request.params.id;
        const {password} = request.payload;

        // Treatment
        var user;
        try {
            user = await ChangePassword(userId, password, serviceLocater);
        } catch(err) {
            return Boom.boomify(err, { statusCode: 400});
        }
        
        // Output
        return { data: serviceLocater.userSerializer.serialize(user), statusCode: 200 };
    },


}