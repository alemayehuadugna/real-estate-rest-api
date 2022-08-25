'use strict';

module.exports = async (notificationId, {notificationRepository }) => {
    return await notificationRepository.find(notificationId);
}