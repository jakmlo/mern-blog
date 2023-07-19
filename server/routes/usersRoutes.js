const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/usersController");
const { auth } = require("../middleware/auth");

router.use(auth);

router.route("/").get(getAllUsers);

router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
