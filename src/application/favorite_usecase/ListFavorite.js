'use strict'

module.exports = async ({ favoriteRepository }) => {
    const favorite = await favoriteRepository.find();
    if(!favorite.length) { throw new Error('No Favorite Found'); }
    return favorite;
}