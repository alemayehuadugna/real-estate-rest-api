'use strict';

module.exports = class {

    create(tasks){
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    getById(userId){
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    deleteTodoList(todoListId, arrayToUpdate){
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }
    addToTask(userId, tasks) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');      
    }
    getTodoListUser(userId) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');        
    }
    find(userId) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');       
    }
    updateCompleted(todoListId, done) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED')
    }
    deleteCompleted() {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED')
    }
    toggleAll(count) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED')
    }
}