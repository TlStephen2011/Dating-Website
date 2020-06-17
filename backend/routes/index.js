var express = require("express");
var router = express.Router();
const AuthService = require('../services/auth.service');

/* GET home page. */
router.get("/", function (req, res, next) {
    res.json({ message: "Welcome to Matcha" });
});

router.post('/auth', (req, res) => {
    req.services.authService.signIn({
        username: req.body.username,
        password: req.body.password
    })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        })
});

module.exports = router;