'use strict'

module.exports = async (limit, page, { feedbackRepository }) =>{
    const feedback = await feedbackRepository.find(limit, page);
    return feedback;
}