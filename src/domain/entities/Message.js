'use strict'

module.exports = class {
    constructor(messageId = null, conversationId, senderId, message){
        this.messageId = messageId;
        this.conversationId = conversationId
        this.senderId = senderId;
        this.message = message;
    }
};
