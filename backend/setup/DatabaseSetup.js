var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'matcha',
  password: 'matcha'
});

connection.connect();

const createDatabaseQuery = "CREATE DATABASE IF NOT EXISTS matcha"

connection.query(createDatabaseQuery, (err) => {
  if (err) throw err;
  console.log('Database successfully created.');
})

const createUsersTableQuery = `CREATE TABLE IF NOT EXISTS \`matcha\`.\`users\` (
  \`Id\` INT NOT NULL AUTO_INCREMENT,
  \`FirstName\` VARCHAR(80) NOT NULL,
  \`LastName\` VARCHAR(80) NOT NULL,
  \`Username\` VARCHAR(45) NOT NULL,
  \`Email\` VARCHAR(45) NOT NULL,
  \`Password\` VARCHAR(80) NOT NULL,
  \`Activated\` TINYINT NULL DEFAULT 0,
  \`Latitude\` DECIMAL(8,6) NOT NULL,
  \`Longitude\` DECIMAL(9,6) NOT NULL,
  \`Biography\` MEDIUMTEXT NULL,
  \`Gender\` ENUM('male', 'female') NULL,
  \`Sexuality\` ENUM('heterosexual', 'homosexual', 'bisexual') NULL DEFAULT 'bisexual',
  \`LastOnline\` DATETIME NULL,
  \`ActivationToken\` VARCHAR(50) NULL,
  \`RegistrationDate\` DATETIME NULL,
  \`ForgotPasswordToken\` VARCHAR(5) NULL,
  PRIMARY KEY (\`Id\`),
  UNIQUE INDEX \`Username_UNIQUE\` (\`Username\` ASC) VISIBLE,
  UNIQUE INDEX \`Email_UNIQUE\` (\`Email\` ASC) VISIBLE);`

connection.query(createUsersTableQuery, (err) => {
  if (err) throw err;
  console.log('Users Table successfully created.');
})

const createMatchesTableQuery = "CREATE TABLE IF NOT EXISTS `matcha`.`matches` ( \
  `Id` INT NOT NULL AUTO_INCREMENT, \
  `User` INT NOT NULL, \
  `Match` INT NOT NULL, \
  `Mutual` TINYINT NULL DEFAULT 0, \
  PRIMARY KEY (`Id`), \
  INDEX `fk_requesting_user_idx` (`User` ASC) VISIBLE, \
  INDEX `fk_matches_to_idx` (`Match` ASC) VISIBLE, \
  CONSTRAINT `fk_requesting_user` \
    FOREIGN KEY (`User`) \
    REFERENCES `matcha`.`users` (`Id`) \
    ON DELETE NO ACTION \
    ON UPDATE NO ACTION, \
  CONSTRAINT `fk_matches_to` \
    FOREIGN KEY (`Match`) \
    REFERENCES `matcha`.`users` (`Id`) \
    ON DELETE NO ACTION \
    ON UPDATE NO ACTION);"

connection.query(createMatchesTableQuery, (err) => {
  if (err) throw err;
  console.log('Matches Table successfully created.');
})

const createChatTableQuery = "CREATE TABLE IF NOT EXISTS `matcha`.`chat` ( \
  `Id` INT NOT NULL AUTO_INCREMENT, \
  `User` INT NOT NULL, \
  `To` INT NOT NULL, \
  `Message` MEDIUMTEXT NOT NULL, \
  `At` DATETIME NOT NULL, \
  `Read` TINYINT NULL DEFAULT 0, \
  PRIMARY KEY (`Id`), \
  INDEX `fk_message_to_idx` (`User` ASC) VISIBLE, \
  INDEX `fk_message_from_idx` (`To` ASC) VISIBLE, \
  CONSTRAINT `fk_message_to` \
    FOREIGN KEY (`User`) \
    REFERENCES `matcha`.`users` (`Id`) \
    ON DELETE NO ACTION \
    ON UPDATE NO ACTION, \
  CONSTRAINT `fk_message_from`  \
    FOREIGN KEY (`To`) \
    REFERENCES `matcha`.`users` (`Id`) \
    ON DELETE NO ACTION \
    ON UPDATE NO ACTION); \
"

connection.query(createChatTableQuery, (err) => {
  if (err) throw err;
  console.log('Chat Table successfully created.');
})

const createBlacklistTableQuery = "CREATE TABLE `matcha`.`blacklist` ( \
  `Id` INT NOT NULL AUTO_INCREMENT, \
  `User` INT NULL, \
  `Blacklists` INT NULL, \
  PRIMARY KEY (`Id`), \
  INDEX `fk_user_blocking_idx` (`User` ASC) VISIBLE, \
  INDEX `fk_user_blocked_idx` (`Blacklists` ASC) VISIBLE, \
  CONSTRAINT `fk_user_blocking` \
    FOREIGN KEY (`User`) \
    REFERENCES `matcha`.`users` (`Id`) \
    ON DELETE NO ACTION \
    ON UPDATE NO ACTION, \
  CONSTRAINT `fk_user_blocked` \
    FOREIGN KEY (`Blacklists`) \
    REFERENCES `matcha`.`users` (`Id`) \
    ON DELETE NO ACTION \
    ON UPDATE NO ACTION);"

connection.query(createBlacklistTableQuery, (err) => {
  if (err) throw err;
  console.log('Blacklist Table successfully created.');
})

const createImagesTableQuery = "CREATE TABLE `matcha`.`images` ( \
  `Id` INT NOT NULL, \
  `User` INT NULL, \
  `ImageNumber` INT NULL, \
  `ImagePath` VARCHAR(255) NULL, \
  PRIMARY KEY (`Id`), \
  INDEX `fk_image_belongs_to_idx` (`User` ASC) VISIBLE, \
  CONSTRAINT `fk_image_belongs_to` \
    FOREIGN KEY (`User`) \
    REFERENCES `matcha`.`users` (`Id`) \
    ON DELETE NO ACTION \
    ON UPDATE NO ACTION);"

connection.query(createImagesTableQuery, (err) => {
  if (err) throw err;
  console.log('Images Table successfully created.');
})

const createInterestsTableQuery = "CREATE TABLE `matcha`.`interests` ( \
  `Id` INT NOT NULL AUTO_INCREMENT, \
  `Interest` VARCHAR(35) NOT NULL, \
  PRIMARY KEY (`id`)); \
"

connection.query(createInterestsTableQuery, (err) => {
  if (err) throw err;
  console.log('Interests Table successfully created.');
})

const createUserInterestTableQuery = "CREATE TABLE `matcha`.`user_interest` ( \
  `UserId` INT NOT NULL, \
  `InterestId` INT NOT NULL); \
";

connection.query(createUserInterestTableQuery, (err) => {
  if (err) throw err;
  console.log("User Interests Table successfully created.");
});


const createInterestsTableUniqueIndex = "CREATE UNIQUE INDEX`idx_interests_Interest`  ON`matcha`.`interests`(Interest) COMMENT '' ALGORITHM DEFAULT LOCK DEFAULT";

connection.query(createInterestsTableUniqueIndex, (err) => {
  if (err) throw err;
  console.log('Created unique index on interests table');
})

const autoIncrementImagesTablePrimaryKeyQuery = "ALTER TABLE `matcha`.`images` CHANGE COLUMN`Id` `Id` INT NOT NULL AUTO_INCREMENT;";

connection.query(autoIncrementImagesTablePrimaryKeyQuery, (err) => {
  if (err) throw err;
  console.log('Added auto increment to images table primary key');
})

connection.end();