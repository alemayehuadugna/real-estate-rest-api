'use strict'

const TotalCount = require('../../domain/entities/TotalCount');

module.exports = async ({totalCountRepository}) => {

    const result = await totalCountRepository.get();
    // check if there is already totalCount if there is throw error 
    if(result) { throw new Error("TotalCount already exists"); }

    const totalCount = new TotalCount(null, 0, 0, 0, 0, 0, 0, 0);
    return totalCountRepository.create(totalCount);
}