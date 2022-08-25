'use strict';

const AuthorizationController = require('../../../interface/controllers/AuthorizationController');

module.exports = () => {
    return {
        authenticate: AuthorizationController.verifyAccessToken
    }
}