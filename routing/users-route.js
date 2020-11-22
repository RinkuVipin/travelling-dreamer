const express = require("express");
const { check } = require("express-validator");

const UsersController = require("../controllers/users-controller");
const fileUpload = require("../middlewares/file-upload");

const router = express.Router();

router.get("/", UsersController.getUsers);

router.post(
  "/signup",
  fileUpload.single("userImage"),
  [
    check("userName").isLength({ min: 5 }),
    check("userEmail").normalizeEmail().isEmail(),
    check("userPassword").isLength({ min: 8 }),
  ],
  UsersController.userSignUp
);

router.post("/signin", UsersController.userSignIn);

module.exports = router;
