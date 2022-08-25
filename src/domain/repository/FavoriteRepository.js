'use strict';

module.exports = class {

    createFavorite(favorite){
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
      }
    
    find(){
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');  
    }
    deleteFavorite(userId, propertyId){
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }
    getById(userId, propertyId){
      throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }
};