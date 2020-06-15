const jwt = require('jsonwebtoken');

class AuthService {

    constructor({ userRepository }) {
        this.userRepository = userRepository;
    }

    signIn({ username, password }) {
        return "jwt";
    }

    isSignedIn(authToken) {

        return true;
    }

}

module.exports = AuthService;