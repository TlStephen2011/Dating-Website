const User = require("../entities/User.model");

class UserValidator {

    isValidUsername(username) {

        if (username === undefined) return true;

        if (username && username.length >= 3)
            return true;
        else
            return false;
    }

    isValidEmail(email) {
        if (email === undefined) return true;
        if (email === null) return false;

        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }


}

module.exports = UserValidator;