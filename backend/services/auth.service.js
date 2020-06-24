const jwt = require('jsonwebtoken');
const Hashing = require('../util/hashing.util');
const ValidationFactory = require('../validation/validationFactory');
const jwtSecret = "mysecret"
const EmailService = require('../config/email');
const crypto = require('crypto');
const HashingUtil = require('../util/hashing.util');

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
                        .then(async isMatch => {
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
                                
                                const updateLastOnlineTime = await this.userRepository.update(user.id, {
                                    lastOnline: new Date().toISOString().slice(0, 19).replace('T', ' ')
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

    requestPasswordReset(username) {
        const passwordResetToken = crypto.randomBytes(5).toString('hex').substr(0, 5);

        return new Promise(async (resolve, reject) => {
            if (!username || username.length <= 3) {
                reject({
                    success: false,
                    errors: [{
                        username: "Expected user as a parameter"
                    }]
                })
                return;
            }

            try {
                const user = await this.userRepository.getOne({username});
                const reset = await this.userRepository.update(user.id, {
                    forgotPasswordToken: passwordResetToken
                })
                
                EmailService.sendForgotPassword(passwordResetToken, user.email, `http://localhost:8080/reset/${user.username}`, (error, info) => {
                    if (error) throw error;    
                    resolve({
                        success: true,
                        message: `Check your email at ${user.email} to reset your password`
                    });
                })
                return;
            } catch (error) {
                reject({
                    success: false,
                    errors: [{
                        reset: "Unable to process your request at this time"
                    }]
                })
                return;
            }

        })        
    }

    updatePassword(username, token, newPassword) {
        return new Promise(async (resolve, reject) => {
            const passwordRe = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/;
            const errReject = {
                success: false,
                errors: {
                    username: "Not valid or",
                    token: "is invalid"
                }
            }
            
            if (!passwordRe.test(newPassword)) {
                errReject.errors.password = "Must be exactly 8 characters, 2 uppercase, one special character, 2 digits, 3 lowercase.";
            }

            if (!username || username.length <= 3 || !token || token.length !== 5 || !passwordRe.test(newPassword)) {
                reject(errReject);
                return;
            }

            try {
                const user = await this.userRepository.getOne({username});
                if (user.forgotPasswordToken !== token) {
                    reject({
                        success: false,
                        errors: [{
                            token: "Invalid token"
                        }]
                    })
                    return;
                }

                const passwordHash = await HashingUtil.createHash(newPassword);

                const update = await this.userRepository.update(user.id, {
                    forgotPasswordToken: "",
                    password: passwordHash
                });

                resolve({
                    success: true,
                    message: "Your password has been reset"
                });
                return;

            } catch (error) {
                reject({
                    success: false,
                    errors: [
                        {
                            reset: "Try again later, or request a new token"
                        }
                    ]
                })
            }
        });
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