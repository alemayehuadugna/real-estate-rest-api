'use strict';

module.exports = async (todoListId, done, { todoListRepository }) => {
    return await todoListRepository.updateCompleted(todoListId, done);
}