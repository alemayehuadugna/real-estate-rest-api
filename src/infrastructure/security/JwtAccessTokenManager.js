'use strict';

const jwt = require('jsonwebtoken');

const AccessTokenManager = require('../../application/security/AccessTokenManager');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

module.exports = class extends AccessTokenManager {

    generate(payload) {
        return jwt.sign(payload, JWT_SECRET_KEY);
    }

    decode(accessToken) {
        const user = jwt.verify(accessToken, JWT_SECRET_KEY);
        return user;
    }
}