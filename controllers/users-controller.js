const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");
const UserSchema = require("../schema/usersSchema");
const usersSchema = require("../schema/usersSchema");

/* --------------------------------------------
Retrieves all the user data
----------------------------------------------- */
const getUsers = async (req, res, next) => {
  let signedUsers;
  try {
    signedUsers = await UserSchema.find({}, "-password");
  } catch (e) {
    const error = new HttpError("Oops! Cannot Fetch Users now.", 500);
    return next(error);
  }

  res.json({
    users: signedUsers.map((user) => user.toObject({ getters: true })),
  });
};

/* --------------------------------------------
Adds a new user
----------------------------------------------- */
const userSignUp = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    const error = new HttpError("Please Enter Valid Credentials", 422);
    return next(error);
  }

  const { userName, userPassword, userEmail, userImage } = req.body;

  let signedUser;
  try {
    signedUser = await UserSchema.findOne({ email: userEmail });
  } catch (e) {
    const error = new HttpError("Oops! Signup Process Fails", 500);
    return next(error);
  }

  if (signedUser) {
    const error = new HttpError("This user already exists", 422);
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(userPassword, 12);
  } catch (e) {
    const error = new HttpError("Oops! Signup Process Failed", 500);
    return next(error);
  }

  const newUser = new usersSchema({
    name: userName,
    email: userEmail,
    password: hashedPassword,
    image: req.file.path,
    places: [],
  });

  console.log(userImage);

  try {
    await newUser.save();
  } catch (e) {
    console.log(e);
    const error = new HttpError("Oops! Signup Fails", 500);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: newUser.id,
        email: newUser.email,
      },
      process.env.JWT_TOKEN_KEY,
      { expiresIn: "1h" }
    );
  } catch (e) {
    const error = new HttpError("Sorry! Signup Failed.", 500);
    return next(error);
  }

  res
    .status(200)
    .json({ user: newUser.toObject({ getters: true }), token: token });
};

/* --------------------------------------------
Authenticate a user
----------------------------------------------- */
const userSignIn = async (req, res, next) => {
  const { userPassword, userEmail } = req.body;

  let signedUser;
  try {
    signedUser = await UserSchema.findOne({ email: userEmail });
  } catch (e) {
    const error = new HttpError("Oops! Signin Fails", 500);
    return next(error);
  }

  if (!signedUser) {
    const error = new HttpError("Credentials Wrong", 401);
    return next(error);
  }

  let isPasswordValid;
  try {
    isPasswordValid = await bcrypt.compare(userPassword, signedUser.password);
  } catch (e) {
    const error = new HttpError("Oops! Signin Failed", 500);
    return next(error);
  }

  if (!isPasswordValid) {
    const error = new HttpError("Oops! Credentials are Wrong", 500);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: signedUser.id,
        email: signedUser.email,
      },
      process.env.JWT_TOKEN_KEY,
      { expiresIn: "1h" }
    );
  } catch (e) {
    const error = new HttpError("Sorry! Signin Failed.", 500);
    return next(error);
  }

  res.json({
    user: signedUser.toObject({ getters: true }),
    token: token,
  });
};

//Exports
exports.getUsers = getUsers;
exports.userSignIn = userSignIn;
exports.userSignUp = userSignUp;
