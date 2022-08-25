'use strict';

const Boom = require('@hapi/boom');

const CreateFavorite = require('../../application/favorite_usecase/CreateFavorite');
const ListFavorite = require('../../application/favorite_usecase/ListFavorite');
const DeleteFavorite = require('../../application/favorite_usecase/DeleteFavorite');

module.exports = {

    async createFavorite(request){
        // Context
        const serviceLocater = request.server.app.serviceLocater;

        // Input
        const propertyId = request.payload.propertyId;
        const userId = request.params.id;

        //Treatment
        var favorite;
        try{
            favorite = await CreateFavorite(userId, propertyId, serviceLocater);
        } catch(error) {
            return Boom.boomify(error, {statusCode: 400});
        }

        //Output
        return serviceLocater.favoriteSerializer.serialize(favorite);
    },
    async findFavorites(request) {
        //Context
        const serviceLocater = request.server.app.serviceLocater;

        //Treatment
        var favorite;
        try{
            favorite = await ListFavorite(serviceLocater);
        } catch(error) {
            return Boom.boomify(error, {statusCode: 400});
        }

        //Output
        return favorite.map(serviceLocater.favoriteSerializer.serialize); 
    },
    async deleteFavorite(request, h) {
        //Context
        const serviceLocater = request.server.app.serviceLocater;

        // Input
        const favoriteId = request.params.id;

        //Treatment
        try {
            await DeleteFavorite(favoriteId, serviceLocater);
        } catch(error) {
            return Boom.boomify(error, {statusCode: 400});
        }

        //Output
        return h.response().code(204);
    }

}