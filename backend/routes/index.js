var express = require("express");
var router = express.Router();
var db = require("../database/crud");
var auth = require("../config/auth");
var emailHandler = require("../config/email");
var assert = require("assert");
var auth = require("../config/auth");

/* GET home page. */
router.get("/", function (req, res, next) {
  // check if valid cookie exists and redirect to /profile
  res.render("pages/index");
});

/* POST signup */
// does not render on error
router.post("/signup", (req, res) => {
  let u = {
    firstName: req.body.fname,
    lastName: req.body.lname,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    active: false
  };

  // Validate user first

  // Assume user is validated
  // generate token
  u.token = generateToken();

  db.insertUser(u, (result, errors) => {
    if (errors) {
      // handle errors
      res.json({ success: false, message: "Signup attempt failed", errors });
    } else {
      // handle success, user will already be saved to db

      // send email to verify with token
      emailHandler.sendMail(
        u.token,
        u.email,
        "http://localhost:8080/token/" + u.username,
        (err, info) => {
          assert(null, errors);
          //should navigate to page to tell user to check their email
        }
      );
      res.json({
        success: true,
        message: "You have signed up, please verify your email address."
      });
    }
  });
});

/*
  POST route to resend verification link
  body: {
    username: u
  }
*/
router.post("/resend-verification-link", (req, res) => {
  const user = req.body.username;

  if (!user) {
    res.json({
      success: false,
      message:
        "You have to provide the username of the user to send the link to."
    });
  } else {
    db.getUserEmail(user)
      .then(email => {
        if (!email) {
          res.json({
            success: false,
            message:
              "Are you sure you have registered? If so, you may email support."
          });
        } else {
          const token = generateToken();
          db.updateUserToken(token, user)
            .then(() => {
              emailHandler.sendMail(
                token,
                email,
                "http://" + req.get("host") + "/verify?username=" + user,
                (err, info) => {
                  assert.equal(null, err);
                }
              );
              res.json({
                success: true,
                message: "A new verifaction email has been sent."
              });
            })
            .catch(err => {
              res.json({
                success: false,
                message:
                  "Are you sure you have registered? If so, you may email support."
              });
            });
        }
      })
      .catch(err => {
        res.json({
          success: false,
          message:
            "Are you sure you have registered? If so, you may email support."
        });
      });
  }
});

router.post("/login", (req, res) => {
  let u = {
    username: req.body.username,
    password: req.body.password
  };

  // Validate user
  db.loginUser(u, (result, errors) => {
    if (errors) {
      res.json({ success: false, message: "Sign in failed", errors });
    } else {
      let token = auth.getToken(u.username);
      result.token = token;

      res.setHeader("Set-Cookie", "access_token=" + token);
      res.json({
        access_token: token
      });
      //res.render("dashboard/images");
    }
  });
});

/*
  POST to activate account

  Expected Data: {
    token: String;
  }
*/
router.post("/token/:user?", (req, res) => {
  let username = req.params.user;

  if (!username) {
    res.json({
      success: false,
      message: "Username must be specified in the URL."
    });
  } else {
    // Check if token exists in body
    let token = req.body.token;

    if (!token) {
      res.json({
        success: false,
        message: "Token must be specified in the request."
      });
    } else {
      // Query db for user
      db.getUserToken(username)
        .then(result => {
          if (token === result.token) {
            // Activate user
            db.activateUser(username)
              .then(data => {
                res.json({
                  success: true,
                  message: `${username} has been successfully activated`
                });
              })
              .catch(err => {
                res.json({
                  success: false,
                  message:
                    "Activation failed, please resend the activation link to generate a new token."
                });
              });
          } else {
            res.json({ success: false, message: "Invalid token" });
          }
        })
        .catch(err => {
          res.json({ success: false, message: err.message });
        });
    }
  }
});

/*
  POST request to forgot password
  body: {
    username: user
  }
*/
router.post("/forgot-password", (req, res) => {
  const user = req.body.username;

  if (!user) {
    res.json({
      success: false,
      message: "Are you sure you have registered? If so, you may email support."
    });
  } else {
    db.getUserEmail(user)
      .then(email => {
        if (!email) {
          res.json({
            success: false,
            message:
              "Are you sure you have registered? If so, you may email support."
          });
        } else {
          const token = generateToken();
          db.updateUserToken(token, user)
            .then(() => {
              emailHandler.sendForgotPassword(
                token,
                email,
                "http://" +
                req.get("host") +
                "/forgot-password?username=" +
                user,
                (err, info) => {
                  assert.equal(null, err);
                }
              );
              res.json({
                success: true,
                message: "An email has been sent to reset your password."
              });
            })
            .catch(err => {
              res.json({
                success: false,
                message:
                  "Are you sure you have registered? If so, you may email support."
              });
            });
        }
      })
      .catch(err => {
        res.json({
          success: false,
          message:
            "Are you sure you have registered? If so, you may email support."
        });
      });
  }
});

/*
  POST request to reset password
  body: {
    username: user,
    token: token,
    newPassword: password
  }
*/
router.post("/reset-password", (req, res) => {
  const username = req.body.username;
  const token = req.body.token;
  const password = req.body.newPassword;

  // TODO: validate password strength

  if (!username || !token || !password) {
    res.json({
      success: false,
      message:
        "You need to provide the username, token and new password in the body."
    });
  } else {
    db.getUserToken(username)
      .then(t => {
        if (token === t.token) {
          db.updatePassword(username, password)
            .then(() => {
              res.json({
                success: true,
                message:
                  "Your password has been successfully updated, you may now proceed to login."
              });
            })
            .catch(err => {
              res.json({
                success: false,
                message: "Your password was NOT updated. Please retry later."
              });
            });
        } else {
          res.json({
            success: false,
            token:
              "Unfortunately your token has expired. You may retry your action."
          });
        }
      })
      .catch(err => {
        res.json({
          success: false,
          message:
            "That didn't go as planned. Retry the forgot password link to get a new token."
        });
      });
  }
});

router.get("/logout", auth.verifyToken, (req, res) => {
  res.clearCookie("access_token");
  // might do something different here
  res.render("pages/index");
});

// Get page to verify account with token
router.get("/verify", (req, res) => {
  res.render("pages/verify");
});

router.post("/verify", (req, res) => {
  // get user from db and check if not active if token matches what he received then activate him

  res.render("pages/verify");
});

generateToken = () => {
  const size = 5;
  const lexicon = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
  let token = "";

  for (let i = 0; i < size; i++) {
    token += lexicon[Math.floor(Math.random() * lexicon.length)];
  }
  return token;
};

module.exports = router;

/*

ROUTE Summary

Get /
POST /signup
POST /login
POST /token/:user? -> activate user
POST /resend-verification-link
POST /forgot-password
POST /reset-password
GET /logout

*/
