var express = require("express");
const AuthService = require("../services/auth.service");
var router = express.Router();
const multer = require('multer');
var path = require('path');
const crypto = require('crypto');
var fs = require('fs')

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb({ success: false, error: 'This route only accepts images' }, false);
    }
};

const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/');
    },
    filename: function (req, file, cb) {
        let customFileName = crypto.randomBytes(18).toString('hex');
        cb(null, customFileName + path.extname(file.originalname));
    }
})

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

const profileImageHandler = upload.single('profileImage');
const otherImagesHandler = upload.single('myImage');

router.get("/", AuthService.checkAuth, async function (req, res) {
    try {
        const result = await req.services.imageService.getImages(req.user.id);
        res.json(result);
    } catch (error) {
        res.json(error);
    }
});

router.post('/profile', AuthService.checkAuth, async (req, res) => {
    profileImageHandler(req, res, async (err) => {
        if (err) {
            res.json(err);
        } else {
            try {
                const file = req.file;
                if (!file) {
                    res.json({
                        success: false,
                        error: 'No file provided'
                    });
                    return;
                }
                const result = await req.services.imageService.saveImage(req.user.id, 1, file);
                res.json(result);
            } catch (error) {
                res.json(error);
            }
        }
    })
});

router.post('/:id', AuthService.checkAuth, (req, res) => {
    otherImagesHandler(req, res, async (err) => {
        if (err) {
            res.json(err);
        } else {
            const file = req.file;
            if (!file) {
                res.json({
                    success: false,
                    error: 'No file provided'
                });
                return;
            }

            try {
                const imageNumber = parseInt(req.params.id);
                const validImageNumbers = [2, 3, 4, 5];
                if (!validImageNumbers.includes(imageNumber)) {
                    res.json({
                        success: false,
                        error: 'Invalid image number specified'
                    });
                    return;
                }

                const result = await req.services.imageService.saveImage(req.user.id, imageNumber, file);

                res.json({
                    success: true,
                    message: "Your image has been uploaded"
                });

            } catch (error) {
                res.json(error);
            }


        }
    })
})

router.get('/profile', AuthService.checkAuth, async (req, res) => {
    const { username } = req.query;

    if (username) {
        try {
            const userProfileImagePath = await req.services.imageService.getUserProfileImage(username);
            fs.exists(path.join(__dirname, '../images') + '/' + userProfileImagePath, function (exists) {
                if (exists) res.sendFile(path.join(__dirname, '../images') + '/' + userProfileImagePath)
                else res.json({
                    success: false,
                    message: "Not found"
                });
            })


        } catch (error) {
            res.json({
                success: false,
                error
            })
        }
    } else {
        res.json({
            success: false,
            error: "Specify a username in the query parameter"
        });
    }


});

router.get('/:imagePath', AuthService.checkAuth, (req, res) => {
    // check valid access rights to image (blacklist | matches) unless profile image
    var id = req.param('imagePath');
    fs.exists(path.join(__dirname, '../images') + '/' + id, function (exists) {
        if (exists) res.sendFile(path.join(__dirname, '../images') + '/' + id)
        else res.json({
            success: false,
            message: "Not found"
        });
    })
})

module.exports = router;