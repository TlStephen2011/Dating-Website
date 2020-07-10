const e = require("express");

class MatchesRepository {

    constructor(dbCon) {
        this.connection = dbCon;
    }

    save(user, match) {
        const query = "INSERT INTO matches(User, Match, Mutual) VALUES (?, ?, ?)";

        return new Promise((resolve, reject) => {
            this.connection.query(query, [user, match, false], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            })
        })
    }

    update({ User, Match, Mutual }) {

        const query = "UPDATE matches SET Mutual = ? WHERE User = ? AND Match = ?";

        return new Promise((resolve, reject) => {
            this.connection.query(query, [User, Match, Mutual], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            })
        })

    }

    getAll(id) {
        const query = "SELECT * FROM matches WHERE User = ? AND Mutual = true";

        return new Promise((resolve, reject) => {
            this.connection.query(query, [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            })
        })

    }

    getRequests(id) {
        const query = "SELECT * FROM matches WHERE User = ? AND Mutual = false";

        return new Promise((resolve, reject) => {
            this.connection.query(query, [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            })
        })

    }

}

module.exports = MatchesRepository;