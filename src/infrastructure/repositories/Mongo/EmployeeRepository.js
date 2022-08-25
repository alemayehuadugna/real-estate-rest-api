'use strict';

const Employee = require('../../../domain/entities/Employee');
const MongooseEmployee = require('../../orm/mongoose/schemas/Employee');
const EmployeeRepository = require('../../../domain/repository/EmployeeRepository')

module.exports = class extends EmployeeRepository {

    constructor() { super(); }

    async create(employee) {
        const {firstName, lastName, phone, email, password, role, profilePicture, totalRating, numberOfRaters, rating } = employee;
        const mongooseEmployee = new MongooseEmployee({firstName, lastName, phone, email, password, role, profilePicture, totalRating, numberOfRaters, rating });
        await mongooseEmployee.save();
        return new Employee(mongooseEmployee._id, mongooseEmployee.firstName, mongooseEmployee.lastName, mongooseEmployee.phone, mongooseEmployee.email, 
            mongooseEmployee.password, mongooseEmployee.role, mongooseEmployee.profilePicture,  mongooseEmployee.totalRating, mongooseEmployee.numberOfRaters,
            mongooseEmployee.rating);
    }

    async getEmployeeById(employeeId) {
        const mongooseEmployee = await MongooseEmployee.findById(employeeId);
        // if employee is not found return null
        if (!mongooseEmployee) { return mongooseEmployee; }
        return new Employee(mongooseEmployee._id, mongooseEmployee.firstName, mongooseEmployee.lastName, mongooseEmployee.phone, mongooseEmployee.email, 
            mongooseEmployee.password, mongooseEmployee.role, mongooseEmployee.profilePicture,  mongooseEmployee.totalRating, mongooseEmployee.numberOfRaters,
            mongooseEmployee.rating);       
    }

    async updateRating(employeeId, totalRating, numberOfRaters, rating) {
        const mongooseEmployee = await MongooseEmployee.findOneAndUpdate(
            {_id: employeeId}, 
            {totalRating: totalRating, numberOfRaters: numberOfRaters,
             rating: rating
            }, 
            {new:true});
        return new Employee(mongooseEmployee._id, mongooseEmployee.firstName, mongooseEmployee.lastName, mongooseEmployee.phone, mongooseEmployee.email, 
            mongooseEmployee.password, mongooseEmployee.role, mongooseEmployee.profilePicture,  mongooseEmployee.totalRating, mongooseEmployee.numberOfRaters,
            mongooseEmployee.rating);        
    }

    async findEmployees(limit, page) {
        const mongooseEmployees = await MongooseEmployee.find({ userType: 'Employee'  })
                                                .skip((page - 1) * limit)
                                                .limit(limit);
        return mongooseEmployees.map((mongooseEmployee) => {
            return new Employee(mongooseEmployee._id, mongooseEmployee.firstName, mongooseEmployee.lastName, mongooseEmployee.phone, mongooseEmployee.email, 
                mongooseEmployee.password, mongooseEmployee.role, mongooseEmployee.profilePicture,  mongooseEmployee.totalRating, mongooseEmployee.numberOfRaters,
                mongooseEmployee.rating);
        });
    }

    async filterEmployeeByName(limit, page, firstName, lastName) {
        const [{ paginatedResult, totalCount }] = await MongooseEmployee.aggregate([
            {
                $facet: {
                    "paginatedResult": [
                        { $match: {'firstName': firstName, 'lastName': lastName, 'userType': 'Employee'}},
                        { $skip: (page - 1) * limit},
                        { $limit: limit }
                    ], 
                    "totalCount": [
                        { $match: { 'firstName': firstName, 'lastName': lastName, 'userType': 'Employee'}},
                        { $count: 'totalCount' }
                    ]
                }
            }
        ]);

        if(paginatedResult.length === 0 || totalCount.length === 0) { return { list: paginatedResult, total: 0 }}
        return {
            list: paginatedResult.map((mongooseEmployee) => {
                return new Employee(mongooseEmployee._id, mongooseEmployee.firstName, mongooseEmployee.lastName, mongooseEmployee.phone, mongooseEmployee.email, 
                    mongooseEmployee.password, mongooseEmployee.role, mongooseEmployee.profilePicture,  mongooseEmployee.totalRating, mongooseEmployee.numberOfRaters,
                    mongooseEmployee.rating);
            }),
            total: totalCount[0].totalCount
        }
    }

    async filterEmployeeByEmail(limit, page, email) {
        const [{ paginatedResult, totalCount }] = await MongooseEmployee.aggregate([
            {
                $facet: {
                    "paginatedResult": [
                        { $match: {'email': email, 'userType': 'Employee'}},
                        { $skip: (page - 1) * limit},
                        { $limit: limit }
                    ], 
                    "totalCount": [
                        { $match: { 'email': email, 'userType': 'Employee'}},
                        { $count: 'totalCount' }
                    ]
                }
            }
        ]);

        if(paginatedResult.length === 0 || totalCount.length === 0) { return { list: paginatedResult, total: 0 }}
        return {
            list: paginatedResult.map((mongooseEmployee) => {
                return new Employee(mongooseEmployee._id, mongooseEmployee.firstName, mongooseEmployee.lastName, mongooseEmployee.phone, mongooseEmployee.email, 
                    mongooseEmployee.password, mongooseEmployee.role, mongooseEmployee.profilePicture,  mongooseEmployee.totalRating, mongooseEmployee.numberOfRaters,
                    mongooseEmployee.rating);
            }),
            total: totalCount[0].totalCount
        }
    }

    async getByPhone(phoneNumber) {
        const mongooseEmployee = await MongooseEmployee.findOne({phone: phoneNumber});
        // if user is not found return null
        if (!mongooseEmployee) { return mongooseEmployee; }
        return new Employee(mongooseEmployee._id, mongooseEmployee.firstName, mongooseEmployee.lastName, mongooseEmployee.phone, mongooseEmployee.email, 
            mongooseEmployee.password, mongooseEmployee.role, mongooseEmployee.profilePicture,  mongooseEmployee.totalRating, mongooseEmployee.numberOfRaters,
            mongooseEmployee.rating);        
    }

    async sortEmployeeByRating(limit, page, order) {
        const mongooseEmployees = await MongooseEmployee.find({ 'userType': 'Employee' })
            .sort({ 'rating': order})
            .skip((page - 1) * limit)
            .limit(limit);
        return mongooseEmployees.map((mongooseEmployee) => {
            return new Employee(mongooseEmployee._id, mongooseEmployee.firstName, mongooseEmployee.lastName, mongooseEmployee.phone, mongooseEmployee.email, 
                mongooseEmployee.password, mongooseEmployee.role, mongooseEmployee.profilePicture,  mongooseEmployee.totalRating, mongooseEmployee.numberOfRaters,
                mongooseEmployee.rating);
        });
    }

}