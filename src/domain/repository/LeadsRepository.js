'use strict';

module.exports = class {

  create(lead) {
      throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  getById(leadId) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED'); 
  }


  find(limit, page) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  updateProgress(leadId, newProgress) {
      throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  delete(leadId){
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  getLeadInfo(agentId, userId){
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  findById(agentId){
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

};