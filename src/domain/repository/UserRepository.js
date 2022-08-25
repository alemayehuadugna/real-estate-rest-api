'use strict';

module.exports = class {

  create(user) {
      throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  getById(userId) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED'); 
  }

  getByPhone(phoneNumber) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED'); 
  }

  update(userId, firstName, lastName, email, profilePicture) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  updatePassword(userId, password) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  delete(userId){
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  findUsers(limit, page) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  filterUserByName(limit, page, name) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  filterUserByEmail(limit, page, email) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  
};