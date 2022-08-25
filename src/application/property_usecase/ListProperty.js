'use strict';

module.exports = async (limit, page, { propertyRepository, totalCountRepository }) => {
    const properties = await propertyRepository.find(limit, page);
    const totalCount = await totalCountRepository.get();
    // if(!property.length) { throw new Error('No Property Found'); }
    return {list: properties, total: totalCount.totalProperty};
}