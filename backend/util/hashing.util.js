const bcrypt = require('bcrypt');
const saltRounds = 10;

class Hashing {
    static verify({ password, hash }) {
        return bcrypt.compare(password, hash);
    }

    static createHash(password) {
        return bcrypt.hash(password, saltRounds);
    }
}

module.exports = Hashing;