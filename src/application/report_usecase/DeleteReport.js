'use strict';

module.exports = async (reportId, { reportRepository, totalCountRepository }) => {
    // decreasing number of report
    const totalCount = await totalCountRepository.get();
    const totalCountId = totalCount.totalCountId;
    var totalReport = totalCount.totalReport;
    if(totalReport === 0) { throw new Error('No Report To Delete') };
    totalReport -= 1;
    totalCountRepository.updateTotalReport(totalCountId, totalReport);

    // normal delete
    return reportRepository.delete(reportId);
}