'use strict';

module.exports = class {
    constructor(notificationId = null, subscription, payload, notificationList ) {
        this.notificationId = notificationId;
        this.subscription = subscription;
        this.payload = payload;
        this.notificationList = notificationList;
    }
}