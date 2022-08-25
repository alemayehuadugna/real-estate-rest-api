'use strict';

module.exports = async (count, { todoListRepository }) => {
    if(count > 0) { 
        return await todoListRepository.toggleToTrue();
    }else{
        return await todoListRepository.toggleToFalse();
    }
}