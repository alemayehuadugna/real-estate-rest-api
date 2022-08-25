'use strict';

module.exports = class {
    constructor(revenueId= null, totalIncome, date) {
        this.revenueId = revenueId;
        this.totalIncome = totalIncome;
        this.date = date;
    }
};