'use strict'

module.exports = class {
    constructor(todoListId = null, userId, task, done) {
        this.todoListId = todoListId;
        this.userId = userId;
        this.task = task;
        this.done = done;
    }
};