'use strict';

module.exports = (date, { revenueRepository }) => {
    return revenueRepository.getByDate(date);
}