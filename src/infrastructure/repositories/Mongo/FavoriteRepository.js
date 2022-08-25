'use strict';

const Favorite = require('../../../domain/entities/Favorite');
const MongooseFavorite = require('../../orm/mongoose/schemas/Favorite');
const FavoriteRepository = require('../../../domain/repository/FavoriteRepository');

module.exports = class extends FavoriteRepository {

    constructor() {
        super();
    }
    
    async createFavorite(favorite){
        const {userId, propertyId } = favorite;
        const mongooseFavorite = new MongooseFavorite({userId, propertyId});
        await mongooseFavorite.save();
        return new Favorite(mongooseFavorite._id, mongooseFavorite.userId, mongooseFavorite.propertyId); 
    }
    async find(){
    
        const mongooseFavorite = await MongooseFavorite.find().populate('propertyId');
        return mongooseFavorite.map((mongooseFavorite) => {
            return new Favorite(mongooseFavorite._id, mongooseFavorite.userId, mongooseFavorite.propertyId, mongooseFavorite.properties); 
        })
    }

    async getById(userId) {
        const mongooseFavorite = await MongooseFavorite.find({userId: userId});
        return mongooseFavorite.map((mongooseFavorite) => {
            return new Favorite(mongooseFavorite._id, mongooseFavorite.userId, mongooseFavorite.propertyId); 
        })
    }
    async delete(favoriteId) {
        return MongooseFavorite.findOneAndDelete({_id : favoriteId});
    }

    async getById(userId, propertyId) {
        const mongooseFavorite = await MongooseFavorite.findOne({userId: userId, propertyId: propertyId});
        if(!mongooseFavorite) { return mongooseFavorite; }
        return new Favorite(mongooseFavorite._id, mongooseFavorite.userId, mongooseFavorite.propertyId); 
    }
}