'use strict';

module.exports = class {

  create(feedback) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  getById(feedbackId) {
     throw new Error('ERR_METHOD_NOT_IMPLEMENTED'); 
  }

  find(){
      throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  delete(feedbackId){
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

};