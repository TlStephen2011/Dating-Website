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
            options: [new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")]
        },
        errorMessage: "Must be minimum 8 characters, at least 1 uppercase, at least 1 special character, at least 1 numeric, at least 1 lowercase."
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
    dateOfBirth: {
        in: ['body'],
        isDate: true,
        toDate: true,
        optional: true
    }
};