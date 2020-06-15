const RegistrationValidator = require('./registration.validator');
const UserValidator = require('./user.validator');

class ValidationFactory {
    static create(validatorType) {
        switch (validatorType) {
            case "registration":
                return new RegistrationValidator();
            case "user":
                return new UserValidator();
            default:
                return null;
        }
    }
}

module.exports = ValidationFactory;