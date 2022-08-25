'use strict';

module.exports = async (id, { reportRepository }) => {
    return await reportRepository.searchById(id);
}