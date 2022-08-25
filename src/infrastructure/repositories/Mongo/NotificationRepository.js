"use strict";

const Notification = require("../../../domain/entities/Notification");
const MongooseNotification = require("../../orm/mongoose/schemas/Notification");
const NotificationRepository = require("../../../domain/repository/NotificationRepository");

module.exports = class extends NotificationRepository {
  constructor() {
    super();
  }

  async subscribe(subscription, payload) {
    const mongooseNotification = new MongooseNotification({
      subscription,
      payload,
    });
    await mongooseNotification.save();
    return new Notification(
      mongooseNotification._id,
      mongooseNotification.subscription,
      mongooseNotification.payload,
      mongooseNotification.notificationList
    );
  }

  async findSubscribers() {
    const mongooseNotification = await MongooseNotification.find();
    return mongooseNotification.map((mongooseNotification) => {
      return new Notification(
        mongooseNotification._id,
        mongooseNotification.subscription,
        mongooseNotification.payload,
        mongooseNotification.notificationList
      );
    });
  }

  async getById(receiverId) {
    const mongooseNotification = await MongooseNotification.findOne({
      "payload.id": receiverId,
    });
    if (!mongooseNotification) {
      return mongooseNotification;
    }
    return new Notification(
      mongooseNotification._id,
      mongooseNotification.subscription,
      mongooseNotification.payload,
      mongooseNotification.notificationList
    );
  }

  async updateNotification(id, notification) {
    const mongooseNotification = await MongooseNotification.findOneAndUpdate(
      { "payload.id": id },
      { $push: { notificationList: notification } },
      { new: true }
    );
    return new Notification(
      mongooseNotification._id,
      mongooseNotification.subscription,
      mongooseNotification.payload,
      mongooseNotification.notificationList
    );
  }

  async find(notificationId) {
    const mongooseNotification = await MongooseNotification.findOne({
      "payload.id": notificationId,
    });

    if(mongooseNotification == null) {
      return mongooseNotification;
    }else {
      return new Notification(
        mongooseNotification._id,
        mongooseNotification.subscription,
        mongooseNotification.payload,
        mongooseNotification.notificationList
      );
    }
  }

  async delete(userId, notification) {
    const mongooseNotification = await MongooseNotification.findOneAndUpdate(
      { "payload.id": userId },
      { $pull: { notificationList: notification } },
      { new: true }
    );
    return new Notification(
      mongooseNotification._id,
      mongooseNotification.subscription,
      mongooseNotification.payload,
      mongooseNotification.notificationList
    );
  }
};
