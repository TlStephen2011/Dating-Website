const User = require('../entities/User.model');
const EmailService = require('../config/email');

class ChatService {
    constructor({
        userRepository,
        matchesRepository,
        chatRepository
    }) {
        this.userRepository = userRepository;
        this.matchesRepository = matchesRepository;
        this.chatRepository = chatRepository;
    }

    getAllMessages(id) {
        return new Promise(async (resolve, reject) => {
            try {
            //get users messages for them
                const messages = await this.chatRepository.get(id)
                resolve({
                    success: true,
                    messages
                })
            } catch (error) {
                reject({
                    success: false,
                    error
                })
            }
        })
    }

    sendMessage(id, recv, message) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await this.chatRepository.send(id, recv, message);
                resolve({
                    success: true,
                    result
                });
            } catch(error) {
                reject({
                    success: false,
                    error
                });
            }
        });
    }

    readMessage(id) {
        return new Promise(async (resolve, reject) => {
            try {
                    const result = await this.chatRepository.read(id);
                    resolve({
                        success: true,
                        result
                    });
            } catch(error) {
                reject({
                    success: false,
                    error
                })
            }
        })
    }

    countUnread(id) {
        return new Promise(async (resolve, reject) => {
            try {
                    const result = await this.chatRepository.unread(id);
                    resolve({
                        success: true,
                        result
                    });
            } catch(error) {
                reject({
                    success: false,
                    error
                })
            }
        })
    }
}

module.exports = ChatService;
