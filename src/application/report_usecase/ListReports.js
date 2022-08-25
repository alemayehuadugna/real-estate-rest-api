'use strict';

module.exports = async (limit, page, sort, { reportRepository }) =>{
    const report = await reportRepository.find(limit, page, sort);
    return report;
}