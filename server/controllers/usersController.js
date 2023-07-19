const User = require("../models/user");

//Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users).status(200);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    res.send(user).status(200);
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

// Update a user *in progress*

exports.updateUser = async (req, res) => {
  try {
    const user = new User({
      _id: req.params.id,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    await User.updateOne({ _id: req.params.id }, user);
    res.status(201).json({
      message: "User updated successfully!",
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.status(200).json({
      message: "Deleted!",
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};
