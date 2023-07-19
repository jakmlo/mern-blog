const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 10, //needs to be changed
    required: true,
  },
  role: {
    type: String,
    default: "Basic",
    required: true,
  },
});
module.exports = mongoose.model("user", userSchema);
