"use strict";

module.exports = class {
  async subscribe(subscription, payload) {
    throw new Error("EER_METHOD_NOT_IMPLEMENTED");
  }

  async findSubscribes() {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }

  async getById(personId) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }

  async updateNotification(id, notification) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }

  async find(notificationId) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }

  delete(personId, notification) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }
};
