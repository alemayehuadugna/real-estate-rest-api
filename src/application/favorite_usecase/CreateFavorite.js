'use strict'

const Favorite = require('../../domain/entities/Favorite');

module.exports = async (userId, propertyId, { favoriteRepository, userRepository, propertyRepository } ) => {
    // check if user exists
    var user = await userRepository.getById(userId);
    if (!user) { throw new Error('User not found'); }

    // check if property exists
    var property = await propertyRepository.getById(propertyId);
    if(!property) {throw new Error('property not found'); }

    // check if property already in favorite
    var favorite = await favoriteRepository.getById(userId, propertyId);
    if(!favorite) {
        favorite = new Favorite(null, userId, propertyId);
        return await favoriteRepository.createFavorite(favorite);
    }else {
        throw new Error('favorite already exists');
    }

}