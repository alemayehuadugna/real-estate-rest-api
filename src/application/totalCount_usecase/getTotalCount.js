'use strict';

module.exports = async ({ totalCountRepository }) => {
    const totalCount = totalCountRepository.get();
    if(!totalCount) { throw new Error('totalCount not exists')}
    return totalCount;
}