class RegistrationValidator {
    constructor() {
        console.log("I AM GOING TO VALIDATE REgIsTrAtiOn");
    }

    validate({
        firstName,
        lastName,
        username,
        email,
        password
    }) {
        return {
            errors: [],
            isValid: true
        };
    }
}

module.exports = RegistrationValidator;