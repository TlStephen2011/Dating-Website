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
            this.connection.query(query, [Mutual, Match, User], (err, results) => {
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

    removeConnection(id, userTo) {
        const query = `SELECT id FROM matches WHERE (matches.User = ? AND matches.Match = ? AND matches.Mutual = 1) OR (matches.User = ? AND matches.Match = ? AND matches.Mutual = 1)`;
        const deleteQuery = "DELETE FROM matches WHERE matches.id = ?";

        return new Promise((resolve, reject) => {
            this.connection.query(query, [id, userTo, userTo, id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    if (results.length !== 0) {
                        this.connection.query(deleteQuery, [results[0]['id']], (errr, results) => {
                            if (errr) {
                                reject(errr);
                            } else {
                                resolve('SUCCESS');
                            }
                        })
                    }
                }
            })
        })
    }


}

module.exports = MatchesRepository;
