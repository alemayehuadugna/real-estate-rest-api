'use strict';

module.exports = async (userId, { todoListRepository }) => {
    const todoList = await todoListRepository.find(userId);
    return todoList;
}