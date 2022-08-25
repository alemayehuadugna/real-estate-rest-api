'use strict';

module.exports = {
    name: 'oauth',
    version: '1.0.0',
    register: (server) => {
  
      server.auth.scheme('oauth', require('./scheme'));
  
      server.auth.strategy('oauth-jwt', 'oauth');

    }
  };
