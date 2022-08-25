'use strict'


module.exports = class{

    constructor(id = null, userId, propertyId) {
        this.id = id;
        this.userId = userId;
        this.propertyId = propertyId;
    }
};