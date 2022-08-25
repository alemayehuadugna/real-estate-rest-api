'use strict';

const fs = require('fs');
const Path = require('path');
const ImageRepository = require('../../../domain/repository/ImageRepository');

module.exports = class extends ImageRepository{

    constructor() {
        super();
    }

    async remove(images) {
        // console.log('images in repo remove: ', images)
        try {
            // console.log('remove isArray true')
            if(Array.isArray(images)) {
                images.forEach(async (file) => {
                    await this.removeImageFromStorage(file)
                })
            } else {
                // console.log('remove isArray false')
                await this.removeImageFromStorage(images)
            }
        } catch(err) {
            console.error(err);
            throw err
        }
    }

    async upload(images, propertyId) {
        let savedImages = [];
        try {
            if(Array.isArray(images)) {
                // console.log('isArray true')
                images.forEach(async (image) => {
                    savedImages.push(await this.saveToStorage(image, propertyId));
                })
            } else {
                // console.log('isArray false')
                savedImages.push(await this.saveToStorage(images, propertyId));
            }
            // console.log('savedImages', savedImages)
            return savedImages;
        } catch (err) {
            console.error(err)
            return null;
        }
    }

    async saveToStorage(file, propertyId) {
        let name = propertyId + "_" + file.hapi.filename;
        let path = 'src/infrastructure/resource/uploads/' + name;
        let fileStream = fs.createWriteStream(path);

        fileStream.on('error', (err) => console.error(err))

        file.pipe(fileStream);

        file.on('end', (err) => {
            const ret = {
                filename: file.hapi.filename,
                headers: file.hapi.headers
            }
            return JSON.stringify(ret);
        })
        return name;
    }



    async removeImageFromStorage(image) {
        let path = 'src/infrastructure/resource/uploads/' + image;
        try {
            fs.unlinkSync(path)
            // console.log('file removed')
        } catch(err) {
            console.error(err)
            throw err;
        }
    }

}