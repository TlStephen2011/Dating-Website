const ValidationFactory = require('../validation/validationFactory');
const User = require('../entities/User.model');
const Hashing = require('../util/hashing.util');

class RegistrationService {

    constructor({
        userRepository
    }) {
        this.userRepository = userRepository;
    }

    register({
        firstName,
        lastName,
        username,
        email,
        password,
        longitude,
        latitude
    }) {
        let registrationValidator = ValidationFactory.create("registration");
        let { errors, isValid } = registrationValidator.validate({
            firstName,
            lastName,
            username,
            email,
            password,
            latitude,
            longitude
        });


        return new Promise((resolve, reject) => {
            if (!isValid) {
                reject({
                    success: false,
                    errors
                });
            }

            this.userRepository.getOne({ username })
                .then(user => {
                    reject({
                        success: false,
                        errors: {
                            username: "username is not unique"
                        }
                    });
                })
                .catch(err => {
                    this.userRepository.getOne({ email })
                        .then(user => {
                            reject({
                                success: false,
                                errors: {
                                    email: "email is not unique"
                                }
                            });
                        })
                        .catch(err => {
                            Hashing.createHash(password)
                                .then(hashedPassword => {
                                    password = hashedPassword;
                                    resolve({
                                        success: true,
                                        message: "Registration has been successful"
                                    });
                                })
                        })
                })
            return;
        })

    }
}

module.exports = RegistrationService;