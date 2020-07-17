const ValidationFactory = require('../validation/validationFactory');
const User = require('../entities/User.model');
const Hashing = require('../util/hashing.util');
const EmailService = require('../config/email');
const crypto = require('crypto');

class MatchingService {

    constructor({
        userRepository,
        matchesRepository
    }) {
        this.userRepository = userRepository;
        this.matchesRepository = matchesRepository;
    }

    getAllConnections(id) {
        return new Promise(async (resolve, reject) => {
            try {
                //fixed to check either side of the connection
                const initiated = await this.matchesRepository.getAllInitiated(id);
                const matched = await this.matchesRepository.getAllMatched(id);
                resolve({
                    success: true,
                    connections: [matched, initiated]
                })
            } catch (error) {
                reject({
                    success: false,
                    error
                });
            }
        });
    }

    getAllIncomingRequests(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const ret = await this.matchesRepository.getIncomingRequests(id);
                resolve({
                    success: true,
                    incoming: ret
                })
            } catch (error) {
                reject({
                    success: false,
                    error
                })
            }
        });
    }

    getAllOutgoingRequests(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const requests = await this.matchesRepository.getRequests(id);
                resolve({
                    success: true,
                    requests
                })
            } catch (error) {
                reject({
                    success: false,
                    error
                })
            }
        })
    }

    createMatch(id, to) {
        return new Promise(async (resolve, reject) => {
            try {
                const ret = await this.matchesRepository.save(id, to);
                resolve({
                    success: true,
                    message: 'Match has been created awaiting confirmation'
                })
            } catch (error) {
                reject({
                    success: false,
                    error
                })
            }
        })
    }

    acceptRequest(id, from) {
        return new Promise(async (resolve, reject) => {
            try {
                const ret = await this.matchesRepository.update({
                    User: id,
                    Match: from,
                    Mutual: true
                });
                resolve({
                    success: true,
                    message: 'You match has been updated'
                })
            } catch (error) {
                reject({
                    success: false,
                    error
                });
            }
        })
    }

}

module.exports = MatchingService;
