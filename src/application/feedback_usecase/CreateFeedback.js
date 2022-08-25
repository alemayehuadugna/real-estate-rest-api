'use strict'

const Feedback = require('../../domain/entities/FeedBack');

module.exports = async (message, userId, name, { feedbackRepository, totalCountRepository, userRepository }) => {

    // checking if user exists or not
    const user = await userRepository.getById(userId);

    if(!user){
        throw new Error("user not found");
    }
    // increment Feedback
    const totalCount = await totalCountRepository.get();
    const totalCountId = totalCount.totalCountId;
    var totalFeedback = totalCount.totalFeedback;
    totalFeedback += 1;
    totalCountRepository.updateTotalFeedback(totalCountId, totalFeedback);

    // calling repository implementation
    const feedback = new Feedback(null, message, userId, name);
    return feedbackRepository.create(feedback);
}