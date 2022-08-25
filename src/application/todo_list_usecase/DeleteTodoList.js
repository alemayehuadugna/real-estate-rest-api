'use strict'

module.exports =async (todoListId, userId, { todoListRepository }) => {
    
    var mongooseTodoList = await todoListRepository.getById(userId, todoListId);
    //check if employee and todoList exists
    if(!mongooseTodoList) { throw new Error('not found'); }

    return await todoListRepository.deleteTodoList(todoListId);
}