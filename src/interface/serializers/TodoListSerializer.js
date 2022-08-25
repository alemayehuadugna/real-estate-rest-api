'use strict';

const _serializeSingleTodoList = (todoList) => {
    return {
        'todoListId': todoList.todoListId,
        'task': todoList.task,
        'done': todoList.done,
    }
}

module.exports = class {

    serialize(data) {
        if(!data){
            throw new Error('Expect data not to be undefined or null')
        }

        if(Array.isArray(data)) {
            return data.map(_serializeSingleTodoList);
        }

        return _serializeSingleTodoList(data);
    }
}