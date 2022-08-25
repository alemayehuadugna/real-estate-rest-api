'use strict'

const Boom = require('@hapi/boom');

const CreateTodoList = require('../../application/todo_list_usecase/CreateTodoList');
const DeleteTodoList = require('../../application/todo_list_usecase/DeleteTodoList');
const UpdateTodoList = require('../../application/todo_list_usecase/UpdateToDoList');
const ListTodoList = require('../../application/todo_list_usecase/ListTodoList');
const UpdateCompleted = require('../../application/todo_list_usecase/UpdateCompleted');
const DeleteCompleted = require('../../application/todo_list_usecase/DeleteCompleted');
const ToggleAll = require('../../application/todo_list_usecase/ToggleAll');

module.exports = {

    async createTodoList(request) {

        //Content
        const serviceLocater = request.server.app.serviceLocater;

        //Input
        const  task  = request.payload.task;
        const userId = request.params.id;
        const done = false;

        //Treatment
        var todoList; 
        try{
            todoList = await CreateTodoList(userId, task, done, serviceLocater);
        } catch(error){
            return Boom.boomify(error, {statusCode: 400});
        }

        // Output
        return {data: serviceLocater.todoListSerializer.serialize(todoList), statusCode: 200};
    }, 

    async deleteTodoList(request){
        //Context
        const serviceLocater = request.server.app.serviceLocater;

        //Input
        const todoListId = request.params.id;
        const userId = request.params.userId;

        //Treatment
        var todoList;
        try{
            todoList = await DeleteTodoList(todoListId, userId, serviceLocater);
        } catch (error) {
            return Boom.boomify(error, {statusCode: 400}); 
        }

        //Output
        return {data: serviceLocater.todoListSerializer.serialize(todoList), statusCode: 200};
    },

    async updateTodoList(request){
        //Context
        const serviceLocater = request.server.app.serviceLocater;

        //Input
        const todoListId = request.params.id;
        const userId= request.params.userId;
        const newTask = request.payload.newTask;

        //Treatment
        var todoList;
        try{
            todoList = await UpdateTodoList(todoListId, userId, newTask, serviceLocater);
        } catch (error) {
            return Boom.boomify(error, {statusCode: 400});   
        }

        //Output
        return { data: serviceLocater.todoListSerializer.serialize(todoList), statusCode: 200 }; 
    },

    async findTodoLists(request) {
        // Context 
        const serviceLocater = request.server.app.serviceLocater;

        //Input
        const userId = request.params.id;

        // Treatment
        var todoLists;
        try{
            todoLists = await ListTodoList(userId, serviceLocater);
        } catch (error){
            return Boom.boomify(error, {statusCode: 400 });
        }

        // Output
        return {data: serviceLocater.todoListSerializer.serialize(todoLists), statusCode:200};
    },

    async updateCompleted(request){

        //Context
        const serviceLocater = request.server.app.serviceLocater;

        //Input
        const todoListId = request.params.id;
        const done = request.payload.done;

        //Treatment
        var todoList;
        try{
            todoList = await UpdateCompleted(todoListId, done, serviceLocater);
        } catch(error) {
            return Boom.boomify(error, {statusCode: 400})
        }

        //Output
        return { data: serviceLocater.todoListSerializer.serialize(todoList), statusCode: 200 };

    },
    
    async deleteCompleted(request) {
        //Context
        const serviceLocater = request.server.app.serviceLocater;

        //Treatment
        let todoList;
        try{
            todoList = await DeleteCompleted(serviceLocater);
        }catch (error) {
            return Boom.boomify(error, { statusCode: 400});
        }

        //  output
        return {
            data: serviceLocater.todoListSerializer.serialize(todoList),
            statusCode: 200
        };
    },

    async toggleAll(request) {
        //Context
        const serviceLocater = request.server.app.serviceLocater;

        // Input
        const count = request.payload.count;

        // Treatment
        let todoList;
        try{
            todoList = await ToggleAll(count, serviceLocater)
        }catch(error) {
            return Boom.boomify(error, { statusCode: 400});
        }

        // Output
        return {
            data:serviceLocater.todoListSerializer.serialize(todoList),
            statusCode: 200
        }
    }
}