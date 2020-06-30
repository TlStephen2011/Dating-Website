class ImageService {

    constructor({
        imagesRepository
    }) {
        this.imagesRepository = imagesRepository;
    }

    getImage(id, imageNumber) {
        return new Promise((resolve, reject) => {
            resolve({
                success: true,
                message: 'NOt iMplementEd'
            });
        })
    }

    getImages(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const images = await this.imagesRepository.get(id);

                if (images) {
                    images.forEach(element => {
                        delete element.Id;
                        delete element.User;
                    });
                }

                resolve({
                    success: true,
                    images
                });
            } catch (error) {
                reject(error);
            }

        })
    }

    saveImage(id, imageNumber, file) {
        return new Promise(async (resolve, reject) => {
            try {
                // check if file exists in repo
                const exists = await this.imagesRepository.get(id, imageNumber);

                if (exists) {
                    await this.imagesRepository.delete(id, imageNumber);
                    //TODO: remove file from disk
                }

                const res = await this.imagesRepository.save(id, imageNumber, file.filename);
                resolve({
                    success: true,
                    message: "Your image has been saved"
                });
            } catch (error) {
                reject({
                    success: false,
                    error
                })
            }
        })
    }

}

module.exports = ImageService;