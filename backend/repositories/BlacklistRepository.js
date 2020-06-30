class BlacklistRepository {

    constructor(dbCon) {
        this.connection = dbCon;
    }

    save(id, userToBlacklist) {
        const query = "INSERT INTO blacklist(User, Blacklists) VALUES (?, ?)";

        return new Promise((resolve, reject) => {
            this.connection.query(query, [id, userToBlacklist], (err) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(`${id} blacklists ${userToBlacklist}`);
            });
        })

    }

    get(id, user) {
        const query = "SELECT * FROM blacklist WHERE User = ? and Blacklists = ?";

        return new Promise((resolve, reject) => {
            this.connection.query(query, [id, user], (err, results) => {
                if (err) {
                    reject(err);
                    return;
                }

                if (results && results.length >= 1) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
        })
    }

}

module.exports = BlacklistRepository;