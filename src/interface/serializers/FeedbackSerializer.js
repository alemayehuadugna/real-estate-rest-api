'use strict'

const _serializeSingleFeedback = (feedback) => {
    return {
        'feedbackId': feedback.feedbackId,
        'message': feedback.message,
        'name': feedback.name,
    };
};

module.exports = class {
    serialize(data) {
        if(!data) {
            throw new Error('Expect data to undefined nor null');
        }
        if(Array.isArray(data)) {
            return data.map(_serializeSingleFeedback);
        }
        return _serializeSingleFeedback(data);
    }
}