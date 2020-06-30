class ImageService {

    constructor({
        imagesRepository,
        userRepository
    }) {
        this.imagesRepository = imagesRepository;
        this.userRepository = userRepository;
    }

    getImage(id, imageNumber) {
        return new Promise((resolve, reject) => {
            resolve({
                success: true,
                message: 'NOt iMplementEd'
            });
        })
    }

    getUserProfileImage(username) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!username || username.length < 3) {
                    reject({
                        success: false,
                        error: "Invalid user"
                    });
                    return;
                }

                const user = await this.userRepository.getOne({ username });
                const images = await this.getImages(user.id);

                if (images.images && images.images.length >= 1) {
                    images.images.forEach(image => {
                        if (image.ImageNumber === 1) {
                            resolve(image.ImagePath);
                        }
                    })
                } else {
                    reject({
                        success: false,
                        error: 'Not found'
                    });
                }

            } catch (error) {
                reject({
                    success: false,
                    error
                })
            }
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