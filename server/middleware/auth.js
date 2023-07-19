const User = require("../models/user");
const bcrypt = require("bcrypt");

// JWT stuff
const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = require("../keys");

//Auth service

exports.auth = async (req, res, next) => {
  try {
    //   get the token from the authorization header
    const token = req.headers.authorization.split(" ")[1];

    //check if the token matches the supposed origin
    const decodedToken = await jwt.verify(token, ACCESS_TOKEN_SECRET);

    // retrieve the user details of the logged in user
    const user = await decodedToken;

    // pass the user down to the endpoints here
    req.user = user;

    // pass down functionality to the endpoint
    return next();
  } catch (err) {
    res.status(401).json({
      message: "No Authorization",
      error: err.message,
    });
  }
};
