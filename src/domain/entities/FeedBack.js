'use strict';

module.exports = class {
    constructor(feedbackId= null, message, userId, name) {
        this.feedbackId = feedbackId;
        this.message = message;
        this.userId = userId;
        this.name = name;
    }
};