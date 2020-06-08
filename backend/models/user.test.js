const User = require("./user");

/* Generic Tests */

test("throws on no parameter to new User", () => {
  expect(() => {
    new User();
  }).toThrow();
});

/* Email address tests */

test("should be TRUE for valid email address in user", () => {
  const u = new User({ email: "me@gmail.com" });

  const validEmail = u.isValidEmailAddress();

  expect(validEmail).toBeTruthy();
});

test("should be FALSE for no email address in user", () => {
  const u = new User({ firstName: "Memememe" });

  const validEmail = u.isValidEmailAddress();

  expect(validEmail).toBeFalsy();
});

test("should be FALSE for empty email address in user", () => {
  const u = new User({ email: "" });

  const validEmail = u.isValidEmailAddress();

  expect(validEmail).toBeFalsy();
});

test("should be FALSE for invalid email address in user", () => {
  const u = new User({ email: "meme@." });

  const validEmail = u.isValidEmailAddress();

  expect(validEmail).toBeFalsy();
});

/* username tests */

test("should be TRUE for username length not empty", () => {
  const u = new User({ username: "tyrone" });

  const validUsername = u.isValidUsername();

  expect(validUsername).toBeTruthy();
});

test("should be FALSE for null username", () => {
  const u = new User({ username: null });

  const validUsername = u.isValidUsername();

  expect(validUsername).toBeFalsy();
});

test("should be FALSE for undefined username", () => {
  const u = new User({});

  const validUsername = u.isValidUsername();

  expect(validUsername).toBeFalsy();
});

/* Gender tests */

test("should be TRUE for gender equal to male", () => {
  const u = new User({ gender: "male" });

  const validGender = u.isValidGender();

  expect(validGender).toBeTruthy();
});

test("should be TRUE for gender equal to female", () => {
  const u = new User({ gender: "female" });

  const validGender = u.isValidGender();

  expect(validGender).toBeTruthy();
});

test("should be FALSE for undefined gender", () => {
  const u = new User({});

  const validGender = u.isValidGender();

  expect(validGender).toBeFalsy();
});

test("should be FALSE for gender equal to null", () => {
  const u = new User({ gender: null });

  const validGender = u.isValidGender();

  expect(validGender).toBeFalsy();
});

test("should be FALSE for gender equal to custom", () => {
  const u = new User({ gender: "custom" });

  const validGender = u.isValidGender();

  expect(validGender).toBeFalsy();
});

test("should be TRUE for gender equal to male case insensitive", () => {
  const u = new User({ gender: "mAle" });

  const validGender = u.isValidGender();

  expect(validGender).toBeTruthy();
});

test("should be TRUE for gender equal to female case insensitive", () => {
  const u = new User({ gender: "FeMale" });

  const validGender = u.isValidGender();

  expect(validGender).toBeTruthy();
});

/* Password Strength Tests */

test("should be TRUE for password containing 8 alphanumeric chars", () => {
  const validPassword = User.validatePasswordStrength("1234578a");

  expect(validPassword).toBeTruthy();
});
