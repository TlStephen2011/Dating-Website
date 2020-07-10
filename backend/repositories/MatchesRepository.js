const e = require("express");

class MatchesRepository {

    constructor(dbCon) {
        this.connection = dbCon;
    }

    save(user, match) {
        const query = "INSERT INTO matches(matches.User, matches.Match) VALUES (?, ?)";

        return new Promise((resolve, reject) => {
            this.connection.query(query, [user, match], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            })
        })
    }

    update({ User, Match, Mutual }) {

        const query = "UPDATE matches SET matches.Mutual = ? WHERE matches.User = ? AND matches.Match = ?";

        return new Promise((resolve, reject) => {
            this.connection.query(query, [Mutual, User, Match], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            })
        })

    }

    //original attempt was flawed cause it only checked if the user matched and the not the match
    getAllInitiated(id) {
        const query = "SELECT * FROM matches WHERE matches.User = ? AND matches.Mutual = true";

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

    getAllMatched(id) {
        const query = "SELECT * FROM matches WHERE matches.Match = ? AND matches.Mutual = true";

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
        const query = "SELECT * FROM matches WHERE matches.User = ? AND matches.Mutual = false";

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

    getIncomingRequests(id) {
        const query = "SELECT * FROM matches WHERE matches.Match = ? AND matches.Mutual = false";

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
