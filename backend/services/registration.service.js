const ValidationFactory = require('../validation/validationFactory');
const User = require('../entities/User.model');

class Registration {

    constructor({
        firstName,
        lastName,
        username,
        email,
        password
    }) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    register() {
        let registrationValidator = ValidationFactory.create("registration");
        let { errors, isValid } = registrationValidator.validate({
            firstName: this.firstName,
            lastName: this.lastName,
            username: this.username,
            email: this.email,
            password: this.password
        });
        console.log(isValid);
    }
}

module.exports = Registration;