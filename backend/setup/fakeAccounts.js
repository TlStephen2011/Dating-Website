const axios = require('axios');
const mysql = require('mysql');
const LoremIpsum = require("lorem-ipsum").LoremIpsum;
const hobbies = require('./hobbies');
const UserRepository = require('../repositories/UserRepository');
const InterestsRepository = require('../repositories/InterestsRepository');
const ImagesRepository = require('../repositories/ImagesRepository');
const Hashing = require('../util/hashing.util');
var path = require('path');

var fs = require('fs');
var https = require('https');
var crypto = require('crypto');
//Node.js Function to save image from External URL.
function saveImageToDisk(url, localPath) {
    var fullUrl = url;
    var file = fs.createWriteStream(localPath);
    var request = https.get(url, function (response) {
        response.pipe(file);
    });
}

const connection = mysql.createPool({
    connectionLimit: 100,
    host: "localhost",
    user: "matcha",
    password: "matcha",
    database: "matcha"
});


const userRepository = new UserRepository(connection);
const imagesRepository = new ImagesRepository(connection);
const interestsRepository = new InterestsRepository(connection);


const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4
    },
    wordsPerSentence: {
        max: 16,
        min: 4
    }
});

axios.get('https://randomuser.me/api/?results=1000&nat=us')
    .then(({ data }) => {
        data.results.forEach((user, i) => {
            handleUser(user);
            console.log(`Added user ${i + 1}: ${user.login.username}`);
        });
    }).catch(err => {
        console.log(err);
    })

getSouthAfricanLocation = () => {
    const coordinates = [];

    const latitude = Math.random() * 10 - 30;
    const longitude = 35 - Math.random() * 8;

    coordinates.push(latitude, longitude);
    return coordinates;
}

generateInterestsList = () => {
    let interests = [];

    for (let i = 0; i < 5; i++) {
        let random = Math.floor(Math.random() * hobbies.length);
        interests.push(hobbies[random]);
    }

    return interests;
}

const sexualityOptions = ['bisexual', 'heterosexual', 'homosexual'];

handleUser = async (user) => {

    const hashedPassword = await Hashing.createHash(user.login.password);
    const location = getSouthAfricanLocation();
    const bio = lorem.generateSentences(5);
    let randomSexuality = Math.floor(Math.random() * 10) % 3;
    const sexuality = sexualityOptions[randomSexuality];
    const birthDate = new Date(user.dob.date);
    let customProfileImageFileName = crypto.randomBytes(18).toString('hex') + '.jpg';

    const registrationObj = {
        firstName: user.name.first,
        lastName: user.name.last,
        username: user.login.username,
        email: user.email,
        password: hashedPassword,
        longitude: location[0],
        latitude: location[1],
        activationToken: "FAKE!"
    };

    const updateObj = {
        activated: true,
        activationToken: "",
        sexuality: sexuality,
        gender: user.gender,
        biography: bio,
        dateOfBirth: birthDate.toISOString().slice(0, 19).replace('T', ' ')
    };

    const interests = generateInterestsList();

    try {
        // insert user
        await userRepository.save(registrationObj)

        // get inserted user to obtain id
        const insertedUser = await userRepository.getOne({ username: registrationObj.username });

        // update user with profile info
        await userRepository.update(insertedUser.id, updateObj);

        await interestsRepository.save(insertedUser.id, interests);

        saveImageToDisk(user.picture.large, path.join(__dirname, '../images') + '/' + customProfileImageFileName);

        await imagesRepository.save(insertedUser.id, 1, customProfileImageFileName);

    } catch (error) {
        console.log('Error adding user', user, error);
    }
}

