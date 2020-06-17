var express = require("express");
var router = express.Router();

const RegistrationService = require('../services/registration.service');

router.post('/', (req, res) => {
    req.services.registrationService.register({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        longitude: req.body.longitude,
        latitude: req.body.latitude
    })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        })
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