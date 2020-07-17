var express = require("express");
var router = express.Router();
const AuthService = require('../services/auth.service');

function buildUserFields(users, req) {

    let counter = 0;

    return new Promise(async (resolve, reject) => {
        for await (let user of users) {
            const userImages = await req.services.imageService.getImages(user.id);
            const userInterests = await req.services.userService.getInterests(user.id);
            user.images = userImages.images;
            user.interests = userInterests.interests;
            counter++;
        }

        if (counter === users.length)
            resolve(users);
        else
            reject('Not looped enough');
    })
}


router.get('/all', AuthService.checkAuth, async (req, res) => {
    try {
        let users = await req.services.userService.getAllUsers();

        const joinedUsers = await buildUserFields(users.users, req);

        let filteredUsers = users.users.map(x => {
            return {
                id: x.id,
                firstName: x.firstName,
                lastName: x.lastName,
                username: x.username,
                longitude: x.longitude,
                latitude: x.latitude,
                biography: x.biography,
                gender: x.gender,
                sexuality: x.sexuality,
                lastOnline: x.lastOnline,
                interests: x.interests,
                dateOfBirth: x.dateOfBirth,
                fameRating: x.fameRating,
                images: x.images,
                interests: x.interests
            }
        })

        res.json({
            success: true,
            users: filteredUsers
        });
    } catch (error) {
        res.json(error)
    }
})

router.get('/interests', AuthService.checkAuth, async (req, res) => {
    try {
        const ret = await req.services.interestsService.getAllInterests();
        res.json(ret);
    } catch (error) {
        res.json(error);
    }
})

router.post('/blacklist', AuthService.checkAuth, async (req, res) => {
    try {
        const { blacklistUser } = req.body;
        if (!blacklistUser) {
            res.json({
                success: false,
                error: 'No user specified'
            });
            return;
        }
        const ret = await req.services.blacklistService.blacklist(req.user.id, blacklistUser);
        res.json(ret);
    } catch (error) {
        res.json(error);
    }
})

router.get('/blacklist', AuthService.checkAuth, async (req, res) => {
    try {
        const blacklistedUsers = await req.services.blacklistService.getAllBlacklisted(req.user.id);
        res.json({
            success: true,
            blacklist: blacklistedUsers
        });
    } catch (error) {
        res.json(error);
    }
})



module.exports = router;
