'use strict';

module.exports = async (employeeId, rate, { employeeRepository }) => {
    
    const employee = await employeeRepository.getEmployeeById(employeeId);
    // if employee does not exists throw error
    if (!employee) { throw new Error('Employee does not exists'); }

    // do calculation on rating 
    let numberOfRaters = employee.numberOfRaters + 1;
    let totalRating = employee.totalRating + rate;
    let rating = totalRating / numberOfRaters;

    return employeeRepository.updateRating(employeeId, totalRating, numberOfRaters, rating);
}