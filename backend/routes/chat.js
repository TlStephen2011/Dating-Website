var express = require("express");
var router = express.Router();
var authService = require('../services/auth.service');


router.post("/send", authService.checkAuth, async function (req, res, next) {
    try {
        console.log("Got here");
        const ret = await req.services.chatService.sendMessage(
            req.user.id, req.body.to, req.body.message
        );
        res.json(ret);
    } catch (error) {
        res.json(error)
    }
})

router.get("/unread", authService.checkAuth, async function (req, res, next) {
    try {
        const ret = await req.services.chatService.countUnread(req.user.id);
        res.json(ret);
    } catch (error) {
        res.json(error)
    }
})

router.put("/read", authService.checkAuth, async function (req, res, next) {
    try {

        let chatId = req.body.chatId;
        const ret = await req.services.chatService.readMessage(chatId);
        res.json(ret);
    } catch (error) {
        res.json(error);
    }
})

module.exports = router;
