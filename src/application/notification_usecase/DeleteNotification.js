'use strict';

module.exports = async (title, description, notificationImage, userId, { notificationRepository }) => {
    var notification = {
        title: title,
        description: description,
        notificationImage: notificationImage,
    }
    const result = await notificationRepository.delete(userId, notification);
    //check if notification exists if it doesn't throw error
    if(!result) { throw new Error('Notification does not exits'); }
    return result;
}