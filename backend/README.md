# matcha
Nodejs, MySQL, Express application

## Running the application
- Create a secrets.json file in config for the email server
```
$> touch ./config/secrets.json
```
- Populate the secrets.json with an email address and password
```
{
  emailAddr: "someRandomEmail@gmail.com",
  emailPass: "someRandomPassword"
}
```
- Modify the MySQL connection string to point to your instance in ./database/db.js
- Run the application
```
$> npm run start
```
