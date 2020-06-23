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
                    Hashing.verify({ password, hash: user.password })
                        .then(isMatch => {
                            if (isMatch) {

                                if (user.activated == false) {
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

    activateUser({
        username,
        activationToken
    }) {
        if (!username || !activationToken) throw new Error('Requires username and activation token');
        if (activationToken.length != 5) throw new Error('Invalid activation token.');

        return new Promise(async (resolve, reject) => {
            try {
                const user = await this.userRepository.getOne({ username });

                if (user.activationToken === activationToken) {
                    const activated = await this.userRepository.update(user.id, { activated: 1, activationToken: "" });
                    resolve({
                        success: true,
                        message: "Your account has been activated"
                    })
                    return;
                }

                reject({
                    success: false,
                    message: "Invalid attempt at verification"
                });
            } catch (error) {
                reject({
                    success: false,
                    message: "Invalid attempt at verification"
                });
            }
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