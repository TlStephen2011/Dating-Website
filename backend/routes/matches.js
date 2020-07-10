var express = require("express");
var router = express.Router();
var authService = require('../services/auth.service');

router.get("/", authService.checkAuth, async function (req, res, next) {
    try {
        const ret = await req.services.matchingService.getAllConnections(req.user.id);
        res.json(ret);
    } catch (error) {
        res.json(error);
    }
});

router.get('/requests', authService.checkAuth, async (req, res) => {
    try {
        const ret = await req.services.matchingService.getAllIncomingRequests(req.user.id);
        res.json(ret);
    } catch (error) {
        res.json(error)
    }
})

router.post('/connect', authService.checkAuth, async (req, res) => {
    try {
        let userToMatch = req.body.userTo;
        if (!userToMatch) {
            throw new Error({
                success: false,
                error: 'Body must contain valid user id'
            });
        }

        const ret = await req.services.matchingService.createMatch(req.user.id, userToMatch);
        res.json(ret);
    } catch (error) {
        res.json(error);
    }
});

router.put('/accept', authService.checkAuth, async (resolve, reject) => {
    try {

    } catch (error) {
        res.json(error);
    }
})

module.exports = router;