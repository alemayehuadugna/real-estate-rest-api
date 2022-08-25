'use strict';

module.exports = class {

	create(property) {
		throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
	}

	getById(propertyId) {
		throw new Error('ERR_METHOD_NOT_IMPLEMENTED'); 
	}

	find(pagination, page) {
		throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
	}

	update(property) {
		throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
	}

	delete(propertyId){
		throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
	}

	updateRating(propertyId, rating, totalRating, numberOfRaters){
		throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
	}

	updateStatus(propertyId, status){
		throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
	}

	filter(limit, page, filterQuery) {
		throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
	}

	updatePropertyImages(images, propertyId) {
		throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
	}

	removePropertyImage(images, propertyId) {
		throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
	}

};