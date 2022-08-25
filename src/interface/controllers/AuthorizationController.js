'use strict';

const Boom = require('@hapi/boom');
const GetAccessToken = require('../../application/user_usecase/GetAccessToken');
const VerifyAccessToken = require('../../application/user_usecase/VerifyAccessToken');

module.exports = {

    async getAccessToken(request) {
        // Context
        const serviceLocater = request.server.app.serviceLocater;

        // Input
        const grantType = request.payload['grant_type'];
        const phone = request.payload['phone'];
        const password = request.payload['password'];
        
        if (!grantType || grantType !== 'password') {
            return Boom.badRequest('Invalid auth strategy');
        }

        // Treatment
        try {
            const accessToken = await GetAccessToken(phone, password, serviceLocater);

            //Output
            return { data: { token: accessToken }, statusCode: 200 };
        } catch (err) {
            return Boom.unauthorized('Bad credentials');
        }
    },

    verifyAccessToken(request, h) {
        // Context
        const serviceLocater = request.server.app.serviceLocater;

        // Input
        const authorizationHeader = request.headers.authorization;
        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            throw Boom.badRequest('Missing or wrong Authorization request header', 'oauth');
        }
        const accessToken = authorizationHeader.replace(/Bearer/gi, '').replace(/ /g, '');
        //Treatment
        try {
            const {uid, scope } = VerifyAccessToken(accessToken, serviceLocater);

            // Output
            return h.authenticated({
                credentials: {uid, scope },
                artifacts: { accessToken: accessToken }
            });

        } catch (err) {
            return Boom.unauthorized('Bad credentials');
        }
    }
}