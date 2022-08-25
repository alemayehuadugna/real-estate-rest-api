'use strict';

const mongoose =  require('../mongoose');

const todoListSchema = new mongoose.Schema({
    userId: String,
    task: String,
    done: Boolean,
});

module.exports = mongoose.model('todoList', todoListSchema);