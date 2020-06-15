const ValidationFactory = require('../validation/validationFactory');
const User = require('../entities/User.model');
const UserRepository = require('../repositories/UserRepository');

class UserService {

    constructor({
        userRepository
    }) {
        this.userRepository = userRepository;
    }

    getUser({ username, email }) {
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
                    resolve({
                        success: true,
                        user: user
                    });
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

}

module.exports = UserService;