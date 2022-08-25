'use strict';

module.exports = class {

  create(review) {
      throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  getByPropertyAndReviewId(reviewId, PropertyId){
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED'); 
  }

  getById(reviewId) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED'); 
  }

  find() {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  update(review) {
      throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  delete(reviewId){
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

};