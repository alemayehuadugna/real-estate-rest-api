'use strict'
module.exports = class {

    constructor(id = null, firstName, lastName, phone, email, password, role, profilePicture) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
        this.password = password;
        this.role = role;
        this.profilePicture = profilePicture;
    }
    
};

