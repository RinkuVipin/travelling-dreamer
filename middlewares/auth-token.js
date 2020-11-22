const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const encodedToken = req.headers.authorization.split(" ")[1]; //Bearer Token
    if (!encodedToken) {
      new Error("User is not authenticated", 401);
    }
    const token = jwt.verify(encodedToken, process.env.JWT_TOKEN_KEY);
    req.userData = {
      userId: token.userId,
    };
    next();
  } catch (e) {
    console.log(e);
    const error = new HttpError("Authentication Failed", 401);
    return next(error);
  }
};
