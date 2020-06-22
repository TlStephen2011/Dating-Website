const jwt = require('jsonwebtoken');
const Hashing = require('../util/hashing.util');
const ValidationFactory = require('../validation/validationFactory');
const jwtSecret = "mysecret"

class AuthService {

    constructor({ userRepository }) {
        this.userRepository = userRepository;
    }

    signIn({ username, password }) {
        return new Promise((resolve, reject) => {

            const validator = ValidationFactory.create("helper");

            if (!validator.isRequired(username) || !validator.isRequired(password)) {
                reject({
                    success: false,
                    errors: {
                        auth: "A valid username and password must be specified"
                    }
                });
                return;
            }

            this.userRepository.getOne(username)
                .then(user => {
                    Hashing.verify(password, user.password)
                        .then(isMatch => {
                            if (isMatch) {

                                if (user.activated === false) {
                                    reject({
                                        success: false,
                                        errors: {
                                            inactive: "Please activate your account by verifying your email address"
                                        }
                                    });
                                    return;
                                }

                                const token = jwt.sign({
                                    id: user.id,
                                    username: user.username
                                }, jwtSecret, {
                                    expiresIn: "1 days"
                                });

                                resolve({
                                    success: true,
                                    message: "Login attempt successful",
                                    authToken: token
                                })
                            } else {
                                reject({
                                    success: false,
                                    errors: {
                                        auth: "Invalid login attempt"
                                    }
                                });
                            }
                        })
                        .catch(err => {
                            reject({
                                success: false,
                                errors: {
                                    auth: "Invalid login attempt"
                                }
                            });
                        });
                })
                .catch(err => {
                    reject({
                        success: false,
                        errors: {
                            auth: "Invalid login attempt"
                        }
                    })
                })
            return;
        })
    }

    static checkAuth(req, res, next) {
        try {
            const decoded = jwt.verify(req.header('X-auth-token'), jwtSecret)
            req.user = decoded;
            next();
        } catch (error) {
            res.status(403).send("You are not authorized to use this resource");
        }
    }

}

module.exports = AuthService;