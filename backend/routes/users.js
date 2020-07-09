var express = require("express");
var router = express.Router();
const AuthService = require('../services/auth.service');
const updateUserSchema = require('../validation/updateUser.schema');
const { validationResult, checkSchema } = require("express-validator");

router.get('/all', AuthService.checkAuth, async (req, res) => {
    try {
        const users = await req.services.userService.getAllUsers();

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
                fameRating: x.fameRating
            }
        })

        res.json(filteredUsers);
    } catch (error) {
        res.json(error)
    }
})


module.exports = router;