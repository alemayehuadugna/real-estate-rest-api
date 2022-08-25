'use strict';

module.exports = async (limit, page, address, area, price, status, bedroomCount, bathroomCount, propertyType, rating, { propertyRepository }) => {
    let list, total = 0;
    list = await propertyRepository.filter(limit, page, { address, area, price, status, bedroomCount, bathroomCount, propertyType, rating })
    total = list.length;
    return {list, total};
}