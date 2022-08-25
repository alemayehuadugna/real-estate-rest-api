"use strict";
const webpush = require("web-push");

module.exports = async (subscription, payload, { notificationRepository }) => {
  const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
  const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

  webpush.setVapidDetails("mail:to@test.com", publicVapidKey, privateVapidKey);
  const hold = JSON.parse(payload);
  webpush
    .sendNotification(subscription, payload)
    .catch((err) => console.error(err));

  return await notificationRepository.subscribe(subscription, hold);
};
