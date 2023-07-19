const User = require("../models/user");
const bcrypt = require("bcrypt");

const USERNAME_REGEX = /[a-zA-z0-9-_]{4,24}$/;
const PASSWORD_REGEX =
  /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{10,24}$/;

// JWT stuff
const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require("../keys");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (password.length < 10) {
      return res
        .status(400)
        .json({ message: "Password shorter than 10 characters" });
    }
    const hash = await bcrypt.hash(password, 10);
    await User.create({
      username,
      email: email.toLowerCase(),
      password: hash,
    });
    res.status(200).json({
      message: "User registered successfully",
    });
  } catch (err) {
    res.status(401).json({
      message: "Registration failed",
      error: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        //const maxAge = 3 * 60 * 60;
        const accessToken = await jwt.sign(
          { id: user._id, email, role: user.role },
          ACCESS_TOKEN_SECRET,
          { expiresIn: "1h" }
        );
        const refreshToken = await jwt.sign(
          { id: user._id },
          REFRESH_TOKEN_SECRET,
          { expiresIn: "3d" }
        );
        res.cookie("jwt", refreshToken, {
          httpOnly: true,
          sameSite: "None", // cross-site cookie
          maxAge: 7 * 24 * 60 * 1000,
        });
        res
          .json({
            accessToken,
            message: "Login successful",
            role: user.role,
            username: user.username,
          })
          .status(200);
      }
    } else {
      res.status(401).json({ message: "Incorrect credentials" });
    }
  } catch (err) {
    res.status(400).json({
      message: "Error occured",
      error: err.message,
    });
  }
};

exports.refresh = async (req, res) => {
  try {
    if (!req.cookies.jwt)
      return res.status(401).json({ message: "No authorization" });
    const refreshToken = req.cookies.jwt;
    const decodedToken = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    console.log(decodedToken);
    const user = await User.findOne({ _id: decodedToken.id });
    if (!user) {
      return res.status(401).json({ message: "No access" });
    }
    const accessToken = await jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "10s" }
    );
    res.status(200).json({ accessToken });
  } catch (err) {
    res.status(400).json({
      message: "Error occured",
      error: err.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    if (!req.cookies.jwt) return res.sendStatus(204);
    res
      .clearCookie("jwt", { httpOnly: true, sameSite: "None" })
      .json({ message: "Logged out" });
  } catch (err) {
    res.status(400).json({
      message: "Error occured",
      error: err.message,
    });
  }
};
