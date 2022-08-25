'use strict';

module.exports = async (employeeId, { employeeRepository }) => {
    const result = await employeeRepository.getEmployeeById(employeeId);
    if (!result) { throw new Error('Employee does not exists!'); }
    return result ;
}