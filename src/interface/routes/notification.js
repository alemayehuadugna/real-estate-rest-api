"use strict";

const NotificationController = require("../controllers/NotificationController");
const {
  idSchema,
  subscribedPayloadSchema,
  subscriberPayloadSchema,
  deletePayloadSchema,
} = require("../validation/notification");

module.exports = {
  name: "notifications",
  version: "1.0.0",
  register: async (server) => {
    server.route([
      {
        method: "POST",
        path: "/notification/subscribed/{id}",
        config: {
          cors: {
            origin: ["*"],
            additionalHeaders: ["cache-control", "x-requested-with"],
          },
          validate: { 
            params: idSchema,
            payload: subscribedPayloadSchema
         },
          handler: NotificationController.subscribed,
          description: "post push notification",
          tags: ["api"],
        },
      },
      {
        method: "POST",
        path: "/notification/subscribe",
        config: {
          cors: {
            origin: ["*"],
            additionalHeaders: ["cache-control", "x-requested-with"],
          },
          validate: { payload: subscriberPayloadSchema },
          handler: NotificationController.subscribe,
          description: "welcome notification",
          tags: ["api"],
        },
      },
      {
        method: "GET",
        path: "/push-notification/icon/{file*}",
        config: {
          handler: {
            directory: {
              path: "src/assets/push-notification",
              listing: true,
            },
          },
          description: "get push notification image",
          tags: ["api"],
        },
      },
      {
        method: "GET",
        path: "/notification/{id}",
        config: {
          cors: {
            origin: ["*"],
            additionalHeaders: ["cache-control", "x-requested-with"],
          },
          validate: {
            params: idSchema,
          },
          handler: NotificationController.findNotifications,
          description: "Get List of Notification",
          tags: ["api"],
        },
      },
      {
        method: "POST",
        path: "/notification/delete/{id}",
        config: {
          cors: {
            origin: ["*"],
            additionalHeaders: ["cache-control", "x-requested-with"],
          },
          validate: {
            params: idSchema,
            payload: deletePayloadSchema,
          },
          handler: NotificationController.deleteNotification,
          description: "Delete Notification by {id}",
          tags: ["api"],
        },
      },
    ]);
  },
};
