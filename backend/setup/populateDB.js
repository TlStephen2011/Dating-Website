var db = require("../database/db");
var mock = require("./MOCK_DATA.json");
var crypto = require("crypto");
var request = require("request");

const ITERATIONS = 1000;
const LENGTH = 64;

onlinePopulation = callback => {
    let data = []
    let collection = db.getDb().collection("users");

    const url = 'https://randomuser.me/api?results=5000&nat=us';

    request(url, (err, res, body) => {
        if (err) {
            callback(err);
        } else {
            console.log(body)
            callback()
        }
    });
}

offlinePopulation = callback => {
    let data = []
    let collection = db.getDb().collection("users");

    mock.forEach(user => {
        var mockObj = {
            firstName: user.fname,
            lastName: user.lname,
            username: user.username,
            email: user.email,
            active: true,
            location: {
                type: "Point",
                coordinates: [user.longitude, user.latitude],
            },
            salt: crypto.randomBytes(16).toString("hex"),
        };

        mockObj["password"] = crypto.pbkdf2Sync(user.password, mockObj.salt, ITERATIONS, LENGTH, `sha512`).toString("hex");
        data.push(mockObj);
    });

    collection.insertMany(data, (err, res) => {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    });
}

module.exports = {
    offlinePopulation,
    onlinePopulation
};