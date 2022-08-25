"use strict";

const Boom = require("@hapi/boom");

const PushNotification = require("../../application/notification_usecase/PushNotification");
const welcomeNotification = require("../../application/notification_usecase/welcomeNotification");
const ListNotifications = require("../../application/notification_usecase/ListNotifications");
const DeleteNotification = require("../../application/notification_usecase/DeleteNotification");

module.exports = {
  async subscribe(request) {
    // context
    const serviceLocater = request.server.app.serviceLocater;

    //Input
    const subscription = request.payload.subscription;
    let title = request.payload.title;
    let description = request.payload.description;
    let notificationImage = request.payload.notificationImage;
    let id = request.payload.id;
    let role = request.payload.role;
    const payload = JSON.stringify({
      title: title,
      description: description,
      notificationImage: notificationImage,
      id: id,
      role: role,
    });

    //Treatement
    const push = await welcomeNotification(
      subscription,
      payload,
      serviceLocater
    );

    //Output
    return { data: push, statusCode: 200 };
  },

  async subscribed(request) {
    // context
    const serviceLocater = request.server.app.serviceLocater;

    //Input
    let title = request.payload.title;
    let description = request.payload.description;
    let notificationImage = request.payload.notificationImage;
    let receiverId = request.payload.receiverId;
    let notificationType = request.payload.notificationType;
    const payload = JSON.stringify({
      title: title,
      description: description,
      notificationImage: notificationImage,
      receiverId: receiverId,
      notificationType: notificationType,
    });
    const userId = request.params.id;

    //Treatement
    const push = await PushNotification(payload, userId, serviceLocater);

    //Output
    return { data: push, statusCode: 200 };
  },

  async findNotifications(request) {
    // Context
    const serviceLocater = request.server.app.serviceLocater;

    //Input
    const notificationId = request.params.id;

    // Treatment
    var notification;
    try {
      notification = await ListNotifications(notificationId, serviceLocater);
    } catch (error) {
      return Boom.boomify(error, { statusCode: 400 });
    }

    // Output
    if (notification == null) {
      return { statusCode: 200, data: [] };
    }
    return { statusCode: 200, data: notification.notificationList };
  },

  async deleteNotification(request) {
    // Context
    const serviceLocater = request.server.app.serviceLocater;

    // Input
    const { title, description, notificationImage } = request.payload;
    const userId = request.params.id;

    // Treatment
    var notification;
    try {
      notification = await DeleteNotification(
        title,
        description,
        notificationImage,
        userId,
        serviceLocater
      );
    } catch (error) {
      return Boom.boomify(error, { statusCode: 400 });
    }

    // Output
    return {
      data: serviceLocater.notificationSerializer.serialize(notification),
      statusCode: 200,
    };
  },
};
