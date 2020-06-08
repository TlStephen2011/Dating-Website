var express = require("express");
var router = express.Router();
var auth = require('../config/auth');
var db = require("../database/crud");

// My profile page
router.get('/', auth.verifyToken, (req, res) => {
    res.render('pages/profile', {username: req.body.username});
});

/*
    PUT route to update location

    Expects: {
        longitude: float,
        latitude: float
    }
*/
router.put('/location', auth.verifyToken, (req, res) => {
    const username = req.body.username;

    if (username === undefined) {
        res.sendStatus(401);
    }

    const coordinates = [
        req.body.longitude,
        req.body.latitude
    ];

    if (coordinates[0] === undefined || coordinates[1] === undefined) {
        res.json({
            success: false,
            message: "You need to provide the longitude and latitude in the request body"
        });
    }

    db.updateUserLocation(coordinates, username).then((doc, err) => {
        if (err) {
            res.json({
                success: false,
                message: "Error updating your location"
            });
        } else {
            res.json({
                success: true,
                message: "Your location has been updated"
            });
        }
    });

});

module.exports = router;