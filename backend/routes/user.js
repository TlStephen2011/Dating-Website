var express = require("express");
var router = express.Router();

const RegistrationService = require('../services/registration.service');

router.post('/', (req, res) => {
});

router.get('/', async (req, res) => {
    req.services.userService.getUser(req.query)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(400).send(err);
        });
})

module.exports = router;