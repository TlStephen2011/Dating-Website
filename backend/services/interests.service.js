const jwt = require('jsonwebtoken');
const Hashing = require('../util/hashing.util');
const ValidationFactory = require('../validation/validationFactory');
const jwtSecret = "mysecret"
const EmailService = require('../config/email');
const crypto = require('crypto');
const HashingUtil = require('../util/hashing.util');

class InterestsService {

    constructor({ interestsRepository }) {
        this.interestsRepository = interestsRepository;
    }

    getAllInterests() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await this.interestsRepository.getAll();
                let interestsArr = [];

                res.forEach(interest => {
                    interestsArr.push(interest.Interest);
                })

                resolve({
                    success: true,
                    interests: interestsArr
                })
            } catch (error) {
                reject({
                    success: false,
                    error
                });
            }
        });
    }

}

module.exports = InterestsService;