'use strict';

module.exports = class {

  create(income) {
      throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  getByDate(date) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED'); 
  }

  update(revenueId, income) {
      throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

};