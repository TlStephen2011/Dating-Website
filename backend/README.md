# matcha
Nodejs, MySQL, Express application

## Running the application
- Install dependencies
```
$> npm install
```
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
- Run the database setup script
```
$> node ./setup/DatabaseSetup.js
```
- Run the application
```
$> npm run start
```
