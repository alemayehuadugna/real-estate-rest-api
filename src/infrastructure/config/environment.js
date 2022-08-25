'use strict';

const constants = require('./constants');

module.exports = (() => {

    const environment = {
        database: {
            dialect: process.env.DATABASE_DIALECT || constants.SUPPORTED_DATABASE.MONGO,
            url: process.env.DATABASE_URL | '',
        }
    };

    if (process.env.NODE_ENV === 'test') {
        environment.database = {
            driver: constants.SUPPORTED_DATABASE.IN_MEMORY
        }
    }

    return environment;
})();