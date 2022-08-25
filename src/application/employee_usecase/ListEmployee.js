'use strict';

module.exports = async (limit, page, searchBy, searchFor, sort, { employeeRepository, totalCountRepository }) => {
    let result, total=0;
    if (searchBy === undefined || searchBy === '') {
        const employees =  await employeeRepository.findEmployees(limit, page);
        // get the total number of employee form totalCount
        const totalCount = await totalCountRepository.get();
        const total = totalCount.totalEmployee;   
        return { list: employees, total: total };
    } else if ( searchBy === 'Name') {
        let fullName = searchFor.split(" ");
        result = await employeeRepository.filterEmployeeByName(limit, page, fullName[0], fullName[1]);
    } else if ( searchBy === 'Email') {
        result = await employeeRepository.filterEmployeeByEmail(limit, page, searchFor);
    } else if ( searchBy === 'Id') {
        let agent = await employeeRepository.getEmployeeById(searchFor);
        // if user not found return empty list with total of 0
        if (!agent) { return { list: [], total: 0 }}
        result = { list: [agent], total: total}
    } else if ( searchBy === 'Phone') {
        let agent = await employeeRepository.getByPhone(searchFor);
        // if user not found return empty list with total of 0
        if (!agent) { return { list: [], total: 0 }}
        result = { list: [agent], total: total }     
    } else if ( searchBy === 'Rating') {
        const agents = await employeeRepository.sortEmployeeByRating(limit, page, sort);
        const totalCount = await totalCountRepository.get();
        result = { list: agents, total: totalCount.totalAgent }                
    } else {
        result = { list: [], total }
    }
    return result;
}