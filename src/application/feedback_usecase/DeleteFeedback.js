'use strict';

module.exports = async (feedbackId, { feedbackRepository, totalCountRepository }) => {
    // decreasing number of lead
    const totalCount = await totalCountRepository.get();
    const totalCountId = totalCount.totalCountId;
    var totalFeedback = totalCount.totalFeedback;
    if(totalFeedback === 0) { throw new Error('No Feedback To Delete')}; 
    totalFeedback -= 1;
    totalCountRepository.updateTotalFeedback(totalCountId, totalFeedback);

    //normal delete
    return await feedbackRepository.delete(feedbackId);
}