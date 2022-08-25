"use strict";
const webpush = require("web-push");
const moment = require("moment");

module.exports = async (payload, userId, { notificationRepository }) => {
  const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
  const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

  webpush.setVapidDetails("mail:to@test.com", publicVapidKey, privateVapidKey);

  const hold = JSON.parse(payload);

  let subscriber = "";
  if (hold.receiverId) {
    subscriber = await notificationRepository.getById(hold.receiverId);
  }

  if (hold.receiverId === null) {
    const subscribers = await notificationRepository.findSubscribers();
    subscribers.map((subscriber) => {
      if (subscriber.payload.role === "Employee") {
        webpush
          .sendNotification(subscriber.subscription, payload)
          .catch((err) => console.error(err));

        // saving each notification to database
        // hold.id = subscriber.payload.id;
        delete hold.receiverId;
        hold.updatedAt = moment(new Date()).format("h:mm:ss a");
        return notificationRepository.updateNotification(
          subscriber.payload.id,
          hold
        );
      }
    });
  } else if (
    hold.receiverId === subscriber.payload.id &&
    subscriber.payload.role === "Employee" && hold.notificationType !== 'admin'
  ) {
    webpush
      .sendNotification(subscriber.subscription, payload)
      .catch((err) => console.error(err));

    // saving  notification to database
    // hold.id = subscriber.payload.id;
    delete hold.receiverId;
    hold.updatedAt = moment(new Date()).format("h:mm:ss a");
    return notificationRepository.updateNotification(
      subscriber.payload.id,
      hold
    );
  } else if (
    hold.receiverId === subscriber.payload.id &&
    subscriber.payload.role === "Admin" && 
    hold.notificationType === 'admin' &&
    userId != hold.receiverId
  ) {
    console.log("hold id: ", hold.receiverId);
    console.log("subscriptionId: ", subscriber.payload.id)
    webpush
      .sendNotification(subscriber.subscription, payload)
      .catch((err) => console.error(err));

    // saving  notification to database
    // hold.id = subscriber.payload.id;
    delete hold.receiverId;
    hold.updatedAt = moment(new Date()).format("h:mm:ss a");
    return notificationRepository.updateNotification(
      subscriber.payload.id,
      hold
    );
  } else {
    if (!subscriber) {
      throw new Error("Subscriber not exists!");
    }
    return subscriber;
  }
};
