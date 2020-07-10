var express = require("express");
var router = express.Router();
var authService = require('../services/auth.service');


router.post("/send", authService.checkAuth, async function (req, res, next) {
    try {
        console.log("Got here");
        const ret = await req.services.chatService.sendMessage(
            req.body.id, req.body.to, req.body.message
        );
        res.json(ret);
    } catch (error) {
        res.json(error)
    }
})

router.get("/unread", authService.checkAuth, async function(req, res, next) {
    try {
        const ret = await req.services.chatService.countUnread(req.user.id);
        res.json(ret);
    } catch (error) {
        res.json(error)
    }
})

module.exports = router;
