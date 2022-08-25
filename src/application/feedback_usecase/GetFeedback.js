'use strict';

module.exports = (feedbackId, { feedbackRepository }) =>{
    return feedbackRepository.getById(feedbackId);
} 