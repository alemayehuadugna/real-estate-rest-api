'use strict'

module.exports = class {

    create(report){
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    getUser(userId) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    updateReport(reportedId, count, reportLists) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    find(sortType, sortOrder) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    delete(reportId) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }
}