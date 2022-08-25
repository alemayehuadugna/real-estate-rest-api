'use strict';

const TodoList = require('../../domain/entities/TodoList');

module.exports = async (userId, task, done, { todoListRepository, userRepository }) => {
    // check if user is employee
    const isEmployee = await userRepository.getById(userId);
    if(!isEmployee){
        throw new Error('user not found');
    }else if(isEmployee.role[0] === 'Employee' || isEmployee.role[0] === 'Admin'){
        const todoList = new  TodoList(null, userId, task,done);
        return await todoListRepository.create(todoList);
    }else{
        throw new Error('only Employee or Admin create todoList')
    }
}