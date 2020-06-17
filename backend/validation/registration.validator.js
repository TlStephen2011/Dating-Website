class RegistrationValidator {
    validate({
        firstName,
        lastName,
        username,
        email,
        password,
        longitude,
        latitude
    }) {

        let errors = [];
        let isValid = true;

        if (!longitude) {
            isValid = false;
            errors.push({ longitude: "Is a required field" });
        }

        if (!latitude) {
            isValid = false;
            errors.push({ latitude: "Is a required field" });
        }

        if (!firstName) {
            isValid = false;
            errors.push({ firstName: "Is a required field" });
        }

        if (!lastName) {
            isValid = false;
            errors.push({ lastName: "Is a required field" });
        }

        if (!username) {
            isValid = false;
            errors.push({ username: "Is a required field" });
        } else if (username.length < 3) {
            isValid = false;
            errors.push({ username: "Must be longer than 3 characters" });
        }

        const emailRe = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (!email) {
            isValid = false;
            errors.push({ email: "Is a required field" });
        } else if (!emailRe.test(email)) {
            isValid = false;
            errors.push({ email: "Must be a valid email address" });
        }

        const passwordRe = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;

        if (!password) {
            isValid = false;
            errors.push({ password: "Is a required field" });
        } else if (!passwordRe.test(password)) {
            isValid = false;
            errors.push({ password: "Must contain at least 6 characters with at least two of (lowercase, numeric, uppercase)" });
        }

        return {
            isValid,
            errors
        };
    }
}

module.exports = RegistrationValidator;