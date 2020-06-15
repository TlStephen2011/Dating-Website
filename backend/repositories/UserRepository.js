const User = require('../entities/User.model');

class UserRepository {

    constructor(dbCon) {
        this.connection = dbCon;
    }

    save() {
    }

    delete() {

    }

    update() {

    }

    getAll() {

    }

    async getOne({ username, email }) {
        let queryConditions;
        let values = [];

        if (username && email) {
            queryConditions = "WHERE username = ? AND email = ?";
            values.push(username, email);
        } else if (username) {
            queryConditions = "WHERE username = ?";
            values.push(username);
        } else if (email) {
            queryConditions = "WHERE email = ?";
            values.push(email);
        }


        let query = "SELECT * FROM USERS " + queryConditions;

        return new Promise((resolve, reject) => {
            this.connection.query(query, values, (error, results, fields) => {
                if (results && results.length === 0) {
                    reject('User not found');
                } else {
                    resolve(new User(results[0]));
                }
                return;
            })
        });
    }

}

module.exports = UserRepository;