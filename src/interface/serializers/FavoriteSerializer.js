'use strict';

const _serializeSingleFavorite = (favorite) => {
    return {
        'id': favorite.id,
        'user-id': favorite.userId,
        'property-id': favorite.propertyId,
    };
};

module.exports = class {

    serialize(data) {
        if(!data) {
            throw new Error('Expect data to be not undefined nor null');
        }
        if(Array.isArray(data)) {
            return data.map(_serialSingleFavorite);
        }
        return _serializeSingleFavorite(data);
    }
}