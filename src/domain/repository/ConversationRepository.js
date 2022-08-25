'use strict';

module.exports = class {

  create(conversation) {
      throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  getById(conversationId) {
      throw new Error('ERR_METHOD_NOT_IMPLEMENTED'); 
  }

  get(userId) {
      throw new Error('ERR_METHOD_NOT_IMPLEMENTED'); 
  }

  clear(conversationIds){
      throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  delete(conversationId){
      throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

};