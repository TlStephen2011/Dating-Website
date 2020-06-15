const jwt = require("jsonwebtoken");
const secret = "mysecret";

verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    res.sendStatus(403);
    return;
  }

  try {
    req.user = jwt.verify(token, secret).username;
  } catch (error) {
    res.sendStatus(403);
    return;
  }

  if (!req.body.username) {
    res.sendStatus(403);
    return;
  }

  next();
};

getToken = username => {
  return jwt.sign({ username: username }, secret, { expiresIn: "2h" });
};

module.exports = {
  verifyToken,
  getToken
};
