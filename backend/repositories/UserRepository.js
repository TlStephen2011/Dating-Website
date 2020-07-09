const User = require('../entities/User.model');
const _ = require('lodash');

class UserRepository {

    constructor(dbCon) {
        this.connection = dbCon;
    }

    save(user) {

        return new Promise(async (resolve, reject) => {
            const query = "INSERT INTO users(FirstName, LastName, Email, Password, Username, Latitude, Longitude, ActivationToken, RegistrationDate, FameRating) \
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), 50)";

            this.connection.query(query, [user.firstName, user.lastName, user.email,
            user.password, user.username, user.latitude, user.longitude, user.activationToken], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

    }

    delete() {

    }

    update(id, payload) {

        Object.keys(payload).forEach(key => {
            payload[_.upperFirst(key)] = payload[key];
            delete payload[key];
        });

        const user = new User(payload);

        let updateQuery = "UPDATE users SET "
        const values = [];

        Object.keys(payload).forEach(key => {
            if (user[_.lowerFirst(key)] === payload[key]) {
                updateQuery += `${_.upperFirst(key)} = ?, `;
                values.push(user[_.lowerFirst(key)]);
            }
        })
        updateQuery = updateQuery.slice(0, updateQuery.length - 2);
        updateQuery += ` WHERE id = ?`;
        values.push(id);

        return new Promise((resolve, reject) => {
            try {
                this.connection.query(updateQuery, values, (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
            } catch (error) {
                reject(error);
            }
            return;
        })

    }

    getAll() {

        const query = "SELECT * FROM users";

        return new Promise((resolve, reject) => {
            this.connection.query(query, (error, results, fields) => {
                if ((results && results.length === 0) || !results) {
                    reject('No Users Found');
                } else {

                    let users = results.map(x => new User(x));

                    resolve(users);
                }
                //return;
            })
        });
    }

    async getOne({ username, email }) {
        let queryConditions;
        let values = [];

        if (username && email) {
            queryConditions = "WHERE Username = ? AND Email = ?";
            values.push(username, email);
        } else if (username) {
            queryConditions = "WHERE Username = ?";
            values.push(username);
        } else if (email) {
            queryConditions = "WHERE Email = ?";
            values.push(email);
        }


        let query = "SELECT * FROM users " + queryConditions;

        return new Promise((resolve, reject) => {
            this.connection.query(query, values, (error, results, fields) => {
                if ((results && results.length === 0) || !results) {
                    reject('User not found');
                } else {
                    resolve(new User(results[0]));
                }
                //return;
            })
        });
    }

    getUserById(id) {
        const query = 'SELECT * FROM users WHERE Id = ?';

        return new Promise((resolve, reject) => {
            this.connection.query(query, [id], (error, results) => {
                if (error) reject('Internal server error');
                else if (results && results.length === 0) reject('User not found');
                else resolve(new User(results[0]));
                return;
            })
        })

    }

}

module.exports = UserRepository;