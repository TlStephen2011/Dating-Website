var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'matcha',
    password: 'matcha'
});

connection.connect();

const testQuery = "INSERT INTO matcha.interests(interest) VALUES ('football'), ('soccer'), ('jogging'), ('useless')";

connection.query(testQuery, (err) => {
    if (err) throw err;
    console.log('Inserted.');
})

connection.end();