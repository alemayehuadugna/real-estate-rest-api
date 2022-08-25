"use strict";

module.exports = class {
	constructor() {}

	create(agent) {
		throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
	}

	getEmployeeById(agentId) {
		throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
	}

	updateRating(agentId, rating) {
		throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
	}

	findEmployees(limit, page) {
		throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
	}

	filterEmployeeByName(limit, page, firstName, lastName) {
		throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
	}

	filterEmployeeByEmail(limit, page, email) {
		throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
	}

	getByPhone(phoneNumber) {
		throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
	}

	sortEmployeeByRating(limit, page, order) {
		throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
	}
};
