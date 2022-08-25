'use strict';

const _serializeSingleEmployee = (employee) => {
    return {
        'id': employee.id,
        'firstName': employee.firstName,
        'lastName': employee.lastName,
        'phone': employee.phone,
        'email': employee.email,
        'profilePicture': employee.profilePicture,
        'rating': employee.rating,
    };
};

module.exports = class {

    serialize(data) {
        if(!data) {
            throw new Error('Expect data to be not undefined nor null');
        }
        if(Array.isArray(data)) {
            return data.map(_serializeSingleEmployee);
        }
        return _serializeSingleEmployee(data);
    }
}
