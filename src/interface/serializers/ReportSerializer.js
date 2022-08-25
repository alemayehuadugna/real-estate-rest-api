'use strict';

const _serializeSingleReport = (report) => {
    return {
        'reportId': report.id,
        'reportedId': report.reportedId,
        'count': report.count,
        'reports': report.reportedList,
    }
}

module.exports = class {

    serialize(data) {
        if(!data) {
            throw new Error('Expect data not to be undefined or null');
        }

        if(Array.isArray(data)) {
            return data.map(_serializeSingleReport);
        }

        return _serializeSingleReport(data);
    }
}