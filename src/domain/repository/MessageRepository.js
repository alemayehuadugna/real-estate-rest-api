'use strict';

module.exports = class {

  create(message) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  getById(messageId) {
     throw new Error('ERR_METHOD_NOT_IMPLEMENTED'); 
  }

  delete(messageId){
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  update(messageId, message) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

};