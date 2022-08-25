'use strict'

module.exports = class {
    constructor(reportId = null, reportedId, count, reportedList ){
        this.reportId = reportId;
        this.reportedId = reportedId;
        this.count = count;
        this.reportedList = reportedList;
    }
};