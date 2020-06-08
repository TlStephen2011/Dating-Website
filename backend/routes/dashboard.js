var express = require("express");
var router = express.Router();
var auth = require("../config/auth");
var db = require("../database/crud");
var User = require("../models/user");
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

/*
  GET request send back all filtered info for the user
  body: {
    username:
    email:
    location:
    photos:
    fname:
    lname:

  }
*/
router.get("/", auth.verifyToken, (req, res) => {
  db.getUserDetails(req.body.username)
    .then(user => {
      console.log(JSON.stringify(user));
      res.json({
        success: true,
        message: "Wow, you made it, glad to see you!",
        status: "Undergoing Construction",
        details: "These are your current details " + JSON.stringify(user)
      });
    })
    .catch(err => {
      console.log(err);
      res.json({
        err
      });
    });
});

/*
  POST to update user details
  body: {
    lname:
    fname:
    username: NEVER CAN CHANGE
    email:
    password:
    location:
    photos: [5],
    gender:
    orientation:
  }

  Username will never be allowed to change (verifyToken overrides any value set)

*/

router.put("/", auth.verifyToken, (req, res) => {
  // TODO: validate here or validate in the constructor of User

  db.updateUserDetails(
    new User({
      username: req.body.username, //get overriden by auth middleware to whatever actual username
      firstName: req.body.fname,
      lastName: req.body.lname,
      email: req.body.email,
      location: req.body.location,
      photos: req.body.photos,
      gender: req.body.gender,
      orientation: req.body.orientation,
      password: req.body.password
    })
  )
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    });
});

router.get('/matches', auth.verifyToken, (req, res) => {
  if (req.body.page === undefined || req.body.distance === undefined) {
    let errors = {};

    if (req.body.page === undefined) {
      errors["page"] = "You need to provide the page number in the body";
    }

    if (req.body.distance === undefined) {
      errors["distance"] = "You need to specify the distance as a number in the body";
    }

    res.json({success: false, errors: errors});
  }

  const page = parseInt(req.body.page);
  const distance = parseInt(req.body.distance);

  db.getMatchesByLocation(page, distance, req.body.username).then(docs => {
    res.json({success: true, matches: docs});
  }).catch(err => {
    console.log(err);
    res.json({success: false, message: "Something went wrong fetching your matches."});
  })

});

// DUMMY route for testing image uploads
router.get('/images', auth.verifyToken, (req, res, next) => {
  res.render('pages/images-temp');
});

// DUMMY route for testing multer
router.post('/images', upload.single('test-image'), (req, res) => {
  console.log(req.file);
});

module.exports = router;
