'use strict'

module.exports = class {
    constructor(conversationId = null, members) {
        this.conversationId = conversationId;
        this.members = members;
    }
};