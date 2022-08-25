"use strict";

module.exports = class {

	
	create(agent) {
		throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
	}

	getAgentById(agentId) {
		throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
	}

	getByPhone(phoneNumber) {
		throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
	}

	updateSalesDone(agentId, previousSalesDone) {
		throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
	}

	updateRentDone(agentId, previousRentDone) {
		throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
	}

	updateRating(agentId, rating) {
		throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
	}

	findAgents(limit, page) {
		throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
	}

	sortAgentByRentDone(limit, page, order) {
		throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
	}

	sortAgentBySalesDone(limit, page, order) {
		throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
	}

	sortAgentByRating(limit, page, order) {
		throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
	}

	filterAgentByName(limit, page, firstName, lastName){
		throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
	}

	filterAgentByEmail(limit, page, email) {
		throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
	}
};
