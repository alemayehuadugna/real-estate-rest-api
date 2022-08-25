'use strict';

const _serializeSinglePropertyReview = (propertyReview) => {
    return {
        'review-Id': propertyReview.reviewId,
        'property-Id': propertyReview.propertyId,
        'user-Id': propertyReview.userId,
        'comment': propertyReview.comment,
        'rating': propertyReview.rating,
    };
};


module.exports = class {
    serialize(data) {
        if(!data){
            throw new Error('Expect data to be not undefined nor null');
        }
        if(Array.isArray(data)) {
            return data.map(_serializeSinglePropertyReview);
        }
        return _serializeSinglePropertyReview(data);
    }
}