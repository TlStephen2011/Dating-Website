const ValidationFactory = require('../validation/validationFactory');
const User = require('../entities/User.model');

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
        password
    }) {
        let registrationValidator = ValidationFactory.create("registration");
        let { errors, isValid } = registrationValidator.validate({
            firstName,
            lastName,
            username,
            email,
            password
        });

        if (!isValid) {
            return {
                success: false,
                errors
            }
        }

        // GetOne from repo to check if username and email are unique

        console.log(isValid);
    }
}

module.exports = RegistrationService;