class BlacklistService {

    constructor({
        userRepository,
        blacklistRepository
    }) {
        this.userRepository = userRepository;
        this.blacklistRepository = blacklistRepository;
    }

    blacklist(id, userToBlacklist) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await this.userRepository.getOne({ username: userToBlacklist });
                const blacklist = await this.blacklistRepository.save(id, user.id);
                resolve({
                    success: true,
                    message: `${userToBlacklist} has been blacklisted`
                });
            } catch (error) {
                reject({
                    success: false,
                    error
                })
            }
        });
    }

    isBlacklisted(id, user) {
        return new Promise(async (resolve, reject) => {
            try {
                const u = this.userRepository.getOne({ username: user });
                const isBlacklisted = await this.blacklistRepository.get(id, u.id);
                resolve({
                    success: true,
                    isBlacklisted
                });
            } catch (error) {
                reject({
                    success: false,
                    error
                });
            }
        });
    }

    getAllBlacklisted(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const blacklistedUsers = await this.blacklistRepository.getAllBlacklistedUsers(id);
                resolve(blacklistedUsers);
            } catch (error) {
                reject({
                    success: false,
                    error
                });
            }
        });
    }

}

module.exports = BlacklistService;