import { Connection } from "mysql";
const User = require('../entities/User.model');

export class UserRepository {

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

    async getOne(username) {
        return new Promise((resolve, reject) => {
            this.connection.connect();

            let query = "SELECT * FROM USERS WHERE username = ?";

            this.connection.query(query, [username], (error, results, fields) => {
                if (results.length === 0) {
                    reject('User not found');
                }
                resolve(new User(results[0]));
            })

            this.connection.end();
        });
    }

}