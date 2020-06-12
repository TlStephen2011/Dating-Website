var express = require("express");
var router = express.Router();
// import { Registration } from "../services/registration.service";
const RegistrationService = require('../services/registration.service');

/* GET current user in session. */
router.get("/", function (req, res, next) {
    res.json({ message: "Welcome to Matcha" });
});

router.post('/', (req, res) => {
    // Convert to User entity
    // Validate User entity for registration
    let registrationService = new RegistrationService({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    });

    registrationService.register();
    res.json({ message: "check consOle" });
});

module.exports = router;