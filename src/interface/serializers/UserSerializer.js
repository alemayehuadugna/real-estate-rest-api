'use strict';

const _serializeSingleUser = (user) => {
    return {
        'id': user.id,
        'firstName': user.firstName,
        'lastName': user.lastName,
        'phone': user.phone,
        'email': user.email,
        'profilePicture': user.profilePicture,
        'roles': user.role
    };
};

module.exports = class {

    serialize(data) {
        if (!data) {
            throw new Error('Expect data to be not undefined nor null');
        }
        if (Array.isArray(data)) {
            return data.map(_serializeSingleUser);
        }
        return _serializeSingleUser(data);
    }

}