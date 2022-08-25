'use strict';

const FavoriteController = require('../controllers/FavoriteController');
const { createFavoriteSchema, idSchema } = require('../validation/favorite');

module.exports = {
    name: 'favorites',
    version: '1.0.0',
    register: async (server) => {

        server.route([
            {
                method: 'POST',
                path: '/users/{id}/addFavorites',
                config: {
                    validate: {
                        params: idSchema,
                        payload: createFavoriteSchema
                    },
                    handler: FavoriteController.createFavorite,
                    description: 'create user favorite',
                    tags: ['api'],
                },
            },
            {
                method: 'GET',
                path: '/users/listFavorites',
                config: {
                    handler: FavoriteController.findFavorites,
                    description: 'List All favorites',
                    tags: ['api'],
                },
            },
            {
                method: 'DELETE',
                path: '/users/favorites/{id}',
                config: {
                    validate: {
                        params: idSchema
                    },
                    handler: FavoriteController.deleteFavorite,
                    description: 'Delete a Favorite',
                    tags: ['api'],
                },
            }
        ]);
    }
}