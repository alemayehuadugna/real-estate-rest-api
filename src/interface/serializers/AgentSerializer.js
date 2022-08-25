'use strict';

const _serializeSingleAgent = (agent) => {
    return {
        'id': agent.id,
        'firstName': agent.firstName,
        'lastName': agent.lastName,
        'phone': agent.phone,
        'email': agent.email,
        'profilePicture': agent.profilePicture,
        'salesDone': agent.salesDone,
        'rentDone': agent.rentDone,
        'rating': agent.rating,
    };
};

module.exports = class {

    serialize(data) {
        if(!data) {
            throw new Error('Expect data to be not undefined nor null');
        }
        if(Array.isArray(data)) {
            return data.map(_serializeSingleAgent);
        }
        return _serializeSingleAgent(data);
    }
}
