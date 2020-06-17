const RegistrationValidator = require('./registration.validator');
const UserValidator = require('./user.validator');
const HelperValidator = require('./helper.validator');

class ValidationFactory {
    static create(validatorType) {
        switch (validatorType) {
            case "registration":
                return new RegistrationValidator();
            case "user":
                return new UserValidator();
            case "helper":
                return new HelperValidator();
            default:
                return null;
        }
    }
}

module.exports = ValidationFactory;