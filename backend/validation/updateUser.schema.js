const { checkSchema } = require('express-validator');

module.exports = {
    email: {
        in: ['body'],
        optional: true,
        isEmail: true,
        normalizeEmail: true,
        errorMessage: 'Must be a valid email address'
    },
    firstName: {
        in: ['body'],
        optional: true,
    },
    lastName: {
        in: ['body'],
        optional: true
    },
    password: {
        in: ['body'],
        optional: true,
        matches: {
            options: [/^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/]
        },
        errorMessage: "Must be exactly 8 characters, 2 uppercase, one special character, 2 digits, 3 lowercase."
    },
    longitude: {
        in: ['body'],
        optional: true,
        isFloat: true
    },
    latitude: {
        in: ['body'],
        optional: true,
        isFloat: true
    },
    biography: {
        in: ['body'],
        optional: true,
        isLength: {
            options: { min: 10 },
            errorMessage: 'Minimum of 10 characters'
        },
        escape: true
    },
    gender: {
        in: ['body'],
        optional: true,
        isIn: {
            options: [['male', 'female']],
            errorMessage: "Must be either 'male' or 'female' (case sensitive)"
        }
    },
    sexuality: {
        in: ['body'],
        optional: true,
        isIn: {
            options: [['heterosexual', 'bisexual', 'homosexual']],
            errorMessage: "Must be either 'bisexual' or 'heterosexual' or 'homosexual' (case sensitive)"
        }
    },
};