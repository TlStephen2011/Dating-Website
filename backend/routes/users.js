var express = require("express");
var router = express.Router();
const AuthService = require('../services/auth.service');
const updateUserSchema = require('../validation/updateUser.schema');
const { validationResult, checkSchema } = require("express-validator");

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
        const users = await req.services.userService.getAllUsers();

        const joinedUsers = await buildUserFields(users.users, req);

        const filteredUsers = users.users.map(x => {
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


module.exports = router;