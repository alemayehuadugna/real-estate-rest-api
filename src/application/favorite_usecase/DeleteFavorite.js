'use strict';

module.exports = async (favoriteId, { favoriteRepository }) => {
    const favorite = await favoriteRepository.delete(favoriteId); 
    // if favorite is null throw error
    if (!favorite) { throw new Error('favorite does not exists'); }  
    return favorite; 
}