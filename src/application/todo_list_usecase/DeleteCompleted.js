'use strict';

module.exports = async ({ todoListRepository }) => {
    return await todoListRepository.deleteCompleted()
}