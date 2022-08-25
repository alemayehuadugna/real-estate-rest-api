'use strict';

const Report = require('../../domain/entities/Report');


module.exports = async (reporterId, reportedId , type, description , { reportRepository, userRepository, totalCountRepository }) => {

    // check if reporterId or reported id exists or not
    var user1 = await userRepository.getById(reporterId);
    var user2 = await userRepository.getById(reportedId);
    if(!user1){
        throw new Error('User not exists');
    }else if(!user2){
        throw new Error('User not exists');
    }
    if( reporterId === reportedId) { throw new Error('Reported Is Reporter'); }
    
    // checking if user already reported
    const user = await reportRepository.getUser(reportedId);
    var reportLists = [
        {
            type: type,
            description: description,
            reporterId: reporterId
        }
    ]
    if(!user){
        const report = new Report(null, reportedId, 1 , reportLists);
        // increment Report
        const totalCount = await totalCountRepository.get();
        const totalCountId = totalCount.totalCountId;
        var totalReport = totalCount.totalReport;
        totalReport = totalReport + 1;
        totalCountRepository.updateTotalReport(totalCountId, totalReport);

        // normal create
        return await reportRepository.create(report);
    }else{
        const count = user.count + 1;
        return reportRepository.updateReport(reportedId, count, reportLists);
    }
}