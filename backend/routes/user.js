var express = require("express");
var router = express.Router();
const AuthService = require('../services/auth.service');
const updateUserSchema = require('../validation/updateUser.schema');
const { validationResult, checkSchema } = require("express-validator");

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
	    console.log(data);
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        })
});

router.put('/', AuthService.checkAuth, checkSchema(updateUserSchema), async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.json({
            success: false,
            errors
        });
    } else {

        const { email, firstName, lastName, password, longitude, latitude, biography, gender, sexuality, dateOfBirth } = req.body;

        try {
            const ret = await req.services.userService.updateUser(req.user.id, {
                email,
                firstName,
                lastName,
                password,
                longitude,
                latitude,
                biography,
                gender,
                sexuality,
                dateOfBirth
            });

            res.json(ret);

        } catch (error) {
            res.json({
                success: false,
                error: error
            });
        }
    }
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
        req.services.userService.getUser({
            id: req.user.id,
            username: req.user.username
        })
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

router.post('/interests', AuthService.checkAuth, async (req, res) => {
    const { interests } = req.body;

    try {
        const ret = await req.services.userService.updateInterests(req.user.id, interests);
        res.json({
            success: true,
            message: 'Your interests have been updated succesfully'
        });
    } catch (error) {
        res.json({
            success: false,
            error
        });
    }
})

router.delete('/interests', AuthService.checkAuth, async (req, res) => {
    const { interests } = req.body;
    try {
        const ret = await req.services.userService.removeInterests(req.user.id, interests);
        res.json({
            success: true,
            message: 'Your interests have been removed'
        })
    } catch (error) {
        res.json({
            success: false,
            error
        });
    }
})

module.exports = router;
