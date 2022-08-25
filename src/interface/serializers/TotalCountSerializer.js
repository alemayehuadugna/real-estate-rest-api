'use strict';

const _serializeSingleTotalCount = (totalCount) => {
    return {
        'total-count-id': totalCount.totalCountId,
        'totalUser': totalCount.totalUser,
        'totalEmployee': totalCount.totalEmployee,
        'totalAgent': totalCount.totalAgent,
        'totalLead': totalCount.totalLead,
        'totalProperty': totalCount.totalProperty,
        'totalFeedback': totalCount.totalFeedback,
        'totalReport': totalCount.totalReport
    }
}

module.exports = class {
    serialize(data) {
        if(!data) {
            throw new Error('Expect data not be undefined or null');
        }

        if(Array.isArray(data)) {
            return data.map(_serializeSingleTotalCount);
        }

        return _serializeSingleTotalCount(data);
    }
}