'use strict';

module.exports = class {

  create(booking) {
      throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  getById(bookingId) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED'); 
  }
  
  find() {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  updateCheck(bookingId, checkInDate, checkOutDate) {
      throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  delete(bookingId){
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

};