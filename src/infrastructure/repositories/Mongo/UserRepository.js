'use strict';

const User = require('../../../domain/entities/User');
const MongooseUser = require('../../orm/mongoose/schemas/User');
const UserRepository = require('../../../domain/repository/UserRepository');

module.exports = class extends UserRepository {

    constructor() {
        super();
    }

    async create(user) {
        const {firstName, lastName, phone, email, password, role, profilePicture } = user;
        const mongooseUser = new MongooseUser({firstName, lastName, phone, email, password, role, profilePicture });
        await mongooseUser.save();
        return new User(mongooseUser._id, mongooseUser.firstName, mongooseUser.lastName, mongooseUser.phone, mongooseUser.email, 
                        mongooseUser.password, mongooseUser.role, mongooseUser.profilePicture);
    }

    async getById(userId) {
        const mongooseUser = await MongooseUser.findById(userId);
        if(!mongooseUser){ return mongooseUser; }
        return new User(mongooseUser._id, mongooseUser.firstName, mongooseUser.lastName, mongooseUser.phone, mongooseUser.email, 
            mongooseUser.password, mongooseUser.role, mongooseUser.profilePicture);
    }


    async getByPhone(phoneNumber) {
        const mongooseUser = await MongooseUser.findOne({ phone: phoneNumber});
        // if user is not found return null
        if (!mongooseUser) { return mongooseUser; }
        return new User(mongooseUser._id, mongooseUser.firstName, mongooseUser.lastName, mongooseUser.phone, mongooseUser.email, 
                        mongooseUser.password, mongooseUser.role, mongooseUser.profilePicture);
    }

    async update(userId, firstName, lastName, email, profilePicture) {
        const mongooseUser = await MongooseUser.findByIdAndUpdate(userId, { firstName, lastName, email, profilePicture }, {new: true});
        // if null then return null
        if (!mongooseUser) { return mongooseUser; }
        return new User(mongooseUser._id, mongooseUser.firstName, mongooseUser.lastName, mongooseUser.phone, mongooseUser.email,
                        mongooseUser.password, mongooseUser.role, mongooseUser.profilePicture);
    }

    async updatePassword(userId, password) {
        const mongooseUser = await MongooseUser.findByIdAndUpdate(userId, {password: password}, {new: true});
        // if user not found return null
        if (!mongooseUser) { return mongooseUser; }
        return new User(mongooseUser._id, mongooseUser.firstName, mongooseUser.lastName, mongooseUser.phone, mongooseUser.email, 
                        mongooseUser.password, mongooseUser.role, mongooseUser.profilePicture); 
    }

    async delete(userId) {
        return MongooseUser.findOneAndDelete({_id: userId});
    }

    async findUsers(limit, page) {
        const mongooseUsers = await MongooseUser.find({ role: { $in: ["User"]} })
                                                .skip((page - 1) * limit)
                                                .limit(limit);
        return mongooseUsers.map((mongooseUser) => {
            return new User(mongooseUser._id, mongooseUser.firstName, mongooseUser.lastName, mongooseUser.phone, mongooseUser.email,
                            mongooseUser.password, mongooseUser.role, mongooseUser.profilePicture);
        });
    }

    async filterUserByName(limit, page, firstName, lastName) {
        const [{ paginatedResult, totalCount }] = await MongooseUser.aggregate([
            {
                $facet: {
                    "paginatedResult": [
                        { $match: {'firstName': firstName, 'lastName': lastName, 'role': { $in: ['User']} }},
                        { $skip: (page - 1) * limit },
                        { $limit: limit}
                    ],
                    "totalCount": [
                        { $match: {'firstName': firstName, 'lastName': lastName, 'role': { $in: ['User']}} },
                        { $count: 'totalCount' }
                    ]
                }
            }
        ])
        // if data not found return empty array and total 0
        if (paginatedResult.length === 0 || totalCount.length === 0) { return { list: paginatedResult, total: 0 }}
        return {
            list: paginatedResult.map((mongooseUser) => {
                return new User(mongooseUser._id, mongooseUser.firstName, mongooseUser.lastName, mongooseUser.phone, mongooseUser.email,
                                mongooseUser.password, mongooseUser.role, mongooseUser.profilePicture);
            }),
            total: totalCount[0].totalCount
        };        
    }

    async filterUserByEmail(limit, page, email) {
        const [{ paginatedResult, totalCount }] = await MongooseUser.aggregate([
            {
                $facet: {
                    "paginatedResult": [
                        { $match: { 'email': email, 'role': { $in: ['User']}}},
                        { $skip: (page - 1) * limit },
                        { $limit: limit}
                    ],
                    "totalCount":[
                        { $match: { 'email': email, 'role': { $in: ['User']}}},
                        { $count: 'totalCount'}
                    ]                
                }
            }
        ])
        // if data not found return empty array and total 0
        if (paginatedResult.length === 0 || totalCount.length === 0) { return { list: paginatedResult, total: 0 }}
        return {
            list: paginatedResult.map((mongooseUser) => {
                return new User(mongooseUser._id, mongooseUser.firstName, mongooseUser.lastName, mongooseUser.phone, mongooseUser.email,
                                mongooseUser.password, mongooseUser.role, mongooseUser.profilePicture);
            }),
            total: totalCount[0].totalCount
        };       
    }
}