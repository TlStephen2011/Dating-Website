const ValidationFactory = require('../validation/validationFactory');
const User = require('../entities/User.model');
const Hashing = require('../util/hashing.util');
const EmailService = require('../config/email');
const crypto = require('crypto');

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
                return;
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

                            // send email

                            Hashing.createHash(password)
                                .then(hashedPassword => {
                                    password = hashedPassword;
                                    const activationToken = crypto.randomBytes(5).toString('hex').substr(0, 5);
                                    this.userRepository.save({
                                        firstName,
                                        lastName,
                                        username,
                                        email,
                                        password,
                                        longitude,
                                        latitude,
                                        activationToken
                                    }).then(result => {
                                        EmailService.sendMail(activationToken, email, `http://localhost:8080/token/${username}`, (err, info) => {

                                            if (err) throw err;

                                            resolve({
                                                success: true,
                                                message: "Registration has been successful, check your email for an activation link"
                                            });
                                        });
                                    })
                                        .catch(err => {
                                            throw err;
                                        })
                                })
                        })
                })
            return;
        })

    }
}

module.exports = RegistrationService;
