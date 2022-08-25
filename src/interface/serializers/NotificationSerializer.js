'use strict'

const _serializeSingleNotification = (notification) => {
    return {
        'notification-id': notification.notificationId,
        'subscription': notification.subscription,
        'payload': notification.payload,
        'notifications': notification.notificationList,
    };
};

module.exports = class {
    serialize(data) {
        if(!data) {
            throw new Error('Expect data to be not undefined nor null');
        }
        if(Array.isArray(data)) {
            return data.map(_serializeSingleNotification);
        }
        return _serializeSingleNotification(data);
    }
}