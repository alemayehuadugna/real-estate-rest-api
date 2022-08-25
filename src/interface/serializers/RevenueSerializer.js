'use strict';

const _serializeSingleRevenue = (revenue) =>{
    return {
        'revenue-Id': revenue.revenueId,
        'total-Income': revenue.totalIncome,
        'date': revenue.date,
    };
};

module.exports = class {
    serialize (data) {
        if(!data) {
            throw new Error('Except data to be not undefined nor null');
        }
        if(Array.isArray(data)) {
            return data.map(_serializeSingleRevenue);
        }
        return _serializeSingleRevenue(data);
    }
}