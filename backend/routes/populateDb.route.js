var express = require("express");
var router = express.Router();
var populator = require('../database/populateDB');

// Get route to populateDb
router.get('/', (req, res) => {
    populator.offlinePopulation((err) => {
        if (err) {
            res.json({success: false, message: err.message});
        } else {
            res.json({success: true, message: "Database has been successfully populated"});
        }
    })
});

module.exports = router;