'use strict';

module.exports = async (employeeId, { userRepository, totalCountRepository }) => {
    const result = await userRepository.delete(employeeId);
    // if employee is null throw error
    if (!result) { throw new Error('Employee does not exists'); }

    // decreasing number of employee in total count
    const totalCount = await totalCountRepository.get();
    const totalCountId = totalCount.totalCountId;
    let totalEmployee = totalCount.totalEmployee;
    totalEmployee -= 1;
    totalCountRepository.updateTotalEmployee(totalCountId, totalEmployee);

    return {employee: result, total: totalEmployee};
}