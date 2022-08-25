'use strict'


module.exports = async (propertyId, description, pricing, address, 
    area, bedroomCount, bathroomCount, garage, rooms, geoLocation, propertyImages, 
    propertyType, propertyStatus, furnishing, finishing, amenities, removedImages, {propertyRepository, imageRepository}) => {

    // save new images
    // console.log('property usecase before upload: ', propertyImages)
    if (propertyImages === undefined || propertyImages.length === 0){ propertyImages = []; } 
    else { propertyImages = await imageRepository.upload( propertyImages, propertyId ); }
    // console.log('update usecase after upload: ', propertyImages);

    // remove images
    // console.log('property usecase before remove', removedImages)
    if (removedImages === undefined || removedImages.length === 0) { removedImages = []; }
    else { await imageRepository.remove(removedImages) }
    // console.log('property usecase before remove', removedImages)

    // remove image from mongodb
    if (removedImages !== undefined || removedImages.length !== 0) {
        await propertyRepository.removePropertyImage(removedImages, propertyId);
    }

    const property = await propertyRepository.update({propertyId, description, pricing, address, 
        area, bedroomCount, bathroomCount, garage, rooms, geoLocation, propertyImages, 
        propertyType, propertyStatus, furnishing, finishing, amenities});

    // check if property exists if not throw an error
    if (!property) { throw new Error('Property does not exits'); }

    return property;
}