'use strict'

const TodoList = require('../../../domain/entities/TodoList');
const MongooseTodoList = require('../../orm/mongoose/schemas/TodoList');
const TodoListRepository = require('../../../domain/repository/TodoListRepository');

module.exports = class extends TodoListRepository {

    constructor() {
        super();
    }

    async create(todoList) {
        const { userId, task, done } = todoList;
        const mongooseTodoList = new MongooseTodoList( {userId, task, done });
        await mongooseTodoList.save();
        return new TodoList(mongooseTodoList._id, mongooseTodoList.userId, mongooseTodoList.task, mongooseTodoList.done, mongooseTodoList.done);
    }
    async getById(userId, todoListId) {
        const mongooseTodoList = await MongooseTodoList.findOne({ userId: userId, _id:todoListId });
        if(!mongooseTodoList){ return mongooseTodoList; }
        return new TodoList(mongooseTodoList._id, mongooseTodoList.userId, mongooseTodoList.tasks, mongooseTodoList.done);    
    }

    async deleteTodoList(todoListId){
        const mongooseTodoList = await MongooseTodoList.findOneAndDelete({_id: todoListId})
        return new TodoList(mongooseTodoList._id, mongooseTodoList.userId, mongooseTodoList.task, mongooseTodoList.done); 
    }

    async updateTodoList(todoListId, newTasks){
        const mongooseTodoList = await MongooseTodoList.findOneAndUpdate({_id: todoListId}, { task: newTasks}, {new:true});
        return new TodoList(mongooseTodoList._id, mongooseTodoList.userId, mongooseTodoList.task, mongooseTodoList.done);
    }

    async find(userId) {
        const mongooseTodoLists = await MongooseTodoList.find({userId: userId});
        return mongooseTodoLists.map((mongooseTodoList) => {
            return new TodoList(mongooseTodoList._id, mongooseTodoList.userId, mongooseTodoList.task, mongooseTodoList.done);
        });
    }

    async updateCompleted(todoListId, done) {
        const mongooseTodoLists = await MongooseTodoList.findOneAndUpdate({_id: todoListId}, { done: done }, {new:true});
        return new TodoList(mongooseTodoLists._id, mongooseTodoLists.userId, mongooseTodoLists.task, mongooseTodoLists.done)
    }

    async deleteCompleted() {
        return MongooseTodoList.deleteMany({done: true})
    }

    async toggleToTrue() {
        const mongooseTodoLists = await MongooseTodoList.updateMany({done: false}, {done: true}, {new:true});
        return new TodoList(mongooseTodoLists._id, mongooseTodoLists.userId, mongooseTodoLists.task, mongooseTodoLists.done)
    }
    async toggleToFalse() {
        const mongooseTodoLists = await MongooseTodoList.updateMany({done: true}, {done: false}, {new:true});
        return new TodoList(mongooseTodoLists._id, mongooseTodoLists.userId, mongooseTodoLists.task, mongooseTodoLists.done)
    }
}