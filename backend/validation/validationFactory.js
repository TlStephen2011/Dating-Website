const RegistrationValidator = require('./registration.validator');

class ValidationFactory {
    static create(validatorType) {
        switch (validatorType) {
            case "registration":
                return new RegistrationValidator();
            default:
                return null;
        }
    }
}

module.exports = ValidationFactory;