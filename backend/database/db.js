const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL
// const url = 'mongodb://localhost:27017';
const url = "mongodb://matcha-database:27017";

// Database Name
const dbName = "matcha";

// Create a new MongoClient
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let _db;

initDb = callback => {
  if (_db) {
    console.log("DB is already initialized");
    callback(null, _db);
  } else {
    client.connect(err => {
      assert.equal(null, err);
      console.log("Connected to database");
      _db = client.db(dbName);
        // create 2dsphere index for location
      
      let usersCollection = _db.collection("users")
      usersCollection.createIndex({location: "2dsphere"}).then((res) => {
        callback(null);
      }).catch((err) => {
        console.log("Error creating 2Dsphere index.");
        throw err;
      });
    });
  }
};

getDb = () => {
  assert.ok(_db, "Db is not yet initialized, please call initDb first!");
  return _db;
};

module.exports = {
  getDb,
  initDb
};
