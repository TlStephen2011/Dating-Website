var express = require("express");
var router = express.Router();
const AuthService = require('../services/auth.service');
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

router.put('/', AuthService.checkAuth, async (req, res) => {
    
})

router.post('/activate/:user', (req, res) => {
    const activationToken = req.body.token;
    const user = req.params.user;

    try {
        req.services.authService.activateUser({
            username: user,
            activationToken
        }).then((data) => {
            res.json(data);
        }).catch(err => {
            res.json(err);
        })
    } catch (error) {
        res.status(400).send(error);
    }

})

router.get('/', AuthService.checkAuth, async (req, res) => {

    if (req.user.username === req.query.username) {
        req.services.userService.getUser(req.query)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(400).send(err);
            });
    } else {
        res.status(403).send({ success: false, message: "You may only get you own information for now." });
    }

})

router.get('/password-reset/:user', async (req, res) => {
    try {
        const data = await req.services.authService.requestPasswordReset(req.params.user);
        res.json(data);
    } catch (error) {
        res.json(error);
    }
})

router.put('/password-reset/:user', async (req, res) => {
    try {
        const data = await req.services.authService.updatePassword(req.params.user, req.body.token, req.body.password)
        res.json(data);
    } catch (error) {
        res.json(error);
    }
})

module.exports = router;