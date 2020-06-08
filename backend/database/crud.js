var db = require("./db");
//var User = require('../models/User');
var assert = require("assert");
var crypto = require("crypto");
var User = require("../models/user");

// Define iterations and hash length globals for password
const ITERATIONS = 1000;
const LENGTH = 64;

insertUser = (u, callback) => {
  const collection = db.getDb().collection("users");

  isUserUnique(collection, u, errors => {
    let errorsSize = Object.keys(errors).length;
    if (errorsSize == 0) {
      // hash password and save salt to u
      const salt = crypto.randomBytes(16).toString("hex");
      u.password = crypto
        .pbkdf2Sync(u.password, salt, ITERATIONS, LENGTH, `sha512`)
        .toString("hex");
      u.salt = salt;

      collection.insertOne(u, (err, result) => {
        assert.equal(null, err);
        callback(result, null);
      });
    } else {
      callback(null, errors);
    }
  });
};

updateUserDetails = async user => {
  const res = {};
  const query = {
    username: user.username
  };
  const update = {
    $set: {}
  };

  const keys = Object.keys(user);

  keys.forEach(el => {
    if (user[el] !== undefined) {
      update.$set[el] = user[el];
    }
  });

  const collection = db.getDb().collection("users");
  await collection.findOneAndUpdate(query, update);
  return await getUserDetails(user.username);
};

getUserDetails = async username => {
  const collection = db.getDb().collection("users");
  const query = {
    username
  };

  const res = await collection.findOne(query);

  res.password = undefined;

  return new User(res);
};

updatePassword = async (username, password) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const newPassword = crypto
    .pbkdf2Sync(password, salt, ITERATIONS, LENGTH, `sha512`)
    .toString("hex");
  const query = {
    username: username
  };
  const update = {
    $set: {
      salt: salt,
      password: newPassword,
      token: generateToken()
    }
  };
  const collection = db.getDb().collection("users");

  await collection.findOneAndUpdate(query, update);
};

loginUser = (u, callback) => {
  // assume u has username and password

  const collection = db.getDb().collection("users");

  collection.findOne({ username: u.username }, (err, result) => {
    assert.equal(null, err);

    let errors = {};

    if (result) {
      // user exists
      // check password
      if (isValidPassword(u.password, result.salt, result.password)) {
        // TODO: filter return value
        callback(result, null);
      } else {
        errors.login = "Username or password is incorrect.";
        callback(null, errors);
      }
    } else {
      errors.login = "Username or password is incorrect.";
      callback(null, errors);
    }
  });
};

isUserUnique = (collection, u, callback) => {
  const query = {
    $or: [
      {
        username: u.username
      },
      {
        email: u.email
      }
    ]
  };

  collection.findOne(query, (err, result) => {
    assert.equal(null, err);
    let errors = {};

    if (result) {
      if (result.username === u.username) {
        errors.username = "Username already exists";
      }
      if (result.email === u.email) {
        errors.email = "Email is already taken";
      }
    }
    callback(errors);
  });
};

isValidPassword = (password, salt, hashedPassword) => {
  const genHash = crypto
    .pbkdf2Sync(password, salt, ITERATIONS, LENGTH, `sha512`)
    .toString("hex");
  return genHash === hashedPassword;
};

getUserToken = async username => {
  const query = {
    username: username
  };

  const collection = db.getDb().collection("users");

  let user = await collection.findOne(query);

  if (!user) {
    throw new Error("User not found");
  }

  let result = { token: user.token };

  return result;
};

activateUser = async username => {
  const query = {
    username: username
  };

  const update = {
    $set: {
      active: true,
      token: generateToken()
    }
  };

  const collection = db.getDb().collection("users");

  let res = await collection.findOneAndUpdate(query, update);

  return res;
};

getUserEmail = async username => {
  const query = {
    username: username
  };

  const collection = db.getDb().collection("users");

  let res = await collection.findOne(query);

  return res.email;
};

updateUserToken = async (token, username) => {
  const query = {
    username: username
  };

  const update = {
    $set: {
      token: token
    }
  };

  const collection = db.getDb().collection("users");
  await collection.findOneAndUpdate(query, update);
};

generateToken = () => {
  const size = 5;
  const lexicon = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
  let token = "";

  for (let i = 0; i < size; i++) {
    token += lexicon[Math.floor(Math.random() * lexicon.length)];
  }
  return token;
};

updateUserLocation = async (coordinates, username) => {
  const query = {
    username: username
  };

  let floatCoords = [
    parseFloat(coordinates[0]),
    parseFloat(coordinates[1])
  ];

  const update = {
    $set: {
      location: {
        type: "Point",
        coordinates: floatCoords
      }
    }
  };

  const collection = db.getDb().collection("users");
  return await collection.findOneAndUpdate(query, update);
};

getMatchesByLocation = async (page, distance, userFrom) => {
  const NUMBER_RES_PER_PAGE = 5
  const u = await getUserDetails(userFrom);
  
  // check if sex and preference assume bisexual if not

  const query = {
    username: {
      $not: {
        $eq: u.username
      }
    },
    location: {
      $nearSphere: {
        $geometry: {
          type: "Point",
          coordinates: [u.location[0], u.location[1]]
        },
        $maxDistance: distance
      }
    }
  }
  
  const collection = db.getDb().collection("users");

  let getUsersPromise = () => {
    return new Promise((resolve, reject) => {      
      collection
      .find(query)
      .skip((page - 1) * NUMBER_RES_PER_PAGE)
      .limit(NUMBER_RES_PER_PAGE)
      .toArray((err, data) => {
        err 
          ? reject(err) 
          : resolve(data);
      });
    });
  };

  return await getUsersPromise();
}

module.exports = {
  insertUser,
  loginUser,
  getUserToken,
  activateUser,
  getUserEmail,
  updateUserToken,
  updatePassword,
  getUserDetails,
  updateUserDetails,
  updateUserLocation,
  getMatchesByLocation
};
