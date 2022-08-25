'use strict';

const Employee = require('../../domain/entities/Employee');

module.exports = async (firstName, lastName, phone, email, password, profilePicture, { employeeRepository, totalCountRepository, userRepository }) => {
    // check if employee exists by the given phone number
    let employee = await userRepository.getByPhone(phone);
    if(employee) { throw new Error('Employee already exists with that phone'); }

    // increment the total number of employee in the totalCount
    const totalCount = await totalCountRepository.get();
    const totalCountId = totalCount.totalCountId;
    let totalEmployee = totalCount.totalEmployee;
    totalEmployee += 1;
    totalCountRepository.updateTotalEmployee(totalCountId, totalEmployee);

    const role = ['Employee'];
    employee = new Employee(null, firstName, lastName, phone, email, password, role, profilePicture, 0, 0, 0);
    return employeeRepository.create(employee);
}