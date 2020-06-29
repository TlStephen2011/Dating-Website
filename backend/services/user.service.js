const ValidationFactory = require('../validation/validationFactory');
const User = require('../entities/User.model');
const UserRepository = require('../repositories/UserRepository');
const EmailService = require('../config/email');
const crypto = require('crypto');

class UserService {

    constructor({
        userRepository,
        interestsRepository
    }) {
        this.userRepository = userRepository;
        this.interestsRepository = interestsRepository;
    }

    getUser({ username, email, id }) {
        let userValidator = ValidationFactory.create("user");
        let validFields = {
            username: userValidator.isValidUsername(username),
            email: userValidator.isValidEmail(email)
        };

        let errorObject = {
            success: false,
            errors: {}
        };

        if (validFields.username === false) errorObject.errors.username = "Username is invalid";
        if (validFields.email === false) errorObject.errors.email = "Email is invalid";


        return new Promise((resolve, reject) => {
            if (Object.keys(errorObject.errors).length > 0) {
                reject(errorObject);
                return;
            }

            this.userRepository
                .getOne({ username, email })
                .then(user => {
                    delete user.password;
                    delete user.activationToken;
                    delete user.forgotPasswordToken;
                    delete user.activated;
                    this.interestsRepository.get(id).then(interests => {
                        user.interests = interests;
                        resolve({
                            success: true,
                            user: user
                        });
                    })
                })
                .catch(err => {
                    resolve({
                        success: false,
                        errors: {
                            user: err
                        }
                    });
                });
            return;
        })
    }

    updateInterests(id, interests) {
        return new Promise(async (resolve, reject) => {
            if (!id) {
                reject('Id not specified');
                return;
            }

            const res = await this.interestsRepository.save(id, interests);
            resolve(res);
        })
    }

    removeInterests(id, interests) {
        return new Promise(async (resolve, reject) => {
            if (!id) {
                reject('Id not specified');
                return;
            }

            try {
                const res = await this.interestsRepository.delete(id, interests);
                resolve(res);
            } catch (error) {
                reject(error);
            }
        })
    }

    updateUser(id, user) {
        let updateOptions = {};

        Object.keys(user).forEach(key => {
            if (user[key]) {
                updateOptions[key] = user[key];
            }
        })

        return new Promise(async (resolve, reject) => {
            if (!id) {
                reject('Id not specified');
                return;
            }

            try {

                if (updateOptions.email) {
                    try {
                        const isEmailUnique = await this.userRepository.getOne({ email: updateOptions.email });
                        reject({
                            success: false,
                            message: "Email in use"
                        });
                        return;
                    } catch (error) {
                        updateOptions.activated = false;
                        const user = await this.userRepository.getUserById(id);
                        const activationToken = crypto.randomBytes(5).toString('hex').substr(0, 5);
                        updateOptions.activationToken = activationToken;
                        EmailService.sendMail(activationToken, updateOptions.email, `http://localhost:8080/user/activate/${user.username}`, async (err, info) => {
                            if (err) throw err;
                            const res = await this.userRepository.update(id, updateOptions);
                            resolve({
                                sucess: true,
                                message: 'Your profile has been updated'
                            });
                            return;
                        });
                    }
                } else {
                    const user = await this.userRepository.getUserById(id);
                    const res = await this.userRepository.update(id, updateOptions);
                    resolve({
                        sucess: true,
                        message: 'Your profile has been updated'
                    });
                    return;
                }

            } catch (error) {
                reject({
                    success: false,
                    error
                });
                return;
            }
        })

    }
}

module.exports = UserService;