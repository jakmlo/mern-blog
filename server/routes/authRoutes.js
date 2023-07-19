const express = require("express");
const router = express.Router();
const {
  register,
  login,
  refresh,
  logout,
} = require("../controllers/authControllers");

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/refresh").get(refresh);

router.route("/logout").post(logout);

module.exports = router;
