const express = require("express");
const router = express.Router();
const {
  getAllPosts,
  getPostById,
  addPost,
  updatePost,
  deletePost,
} = require("../controllers/postsController");
const { auth } = require("../middleware/auth");

router.route("/").get(getAllPosts);

router.use(auth);

router.route("/").post(addPost);

router.route("/:id").get(getPostById).put(updatePost).delete(deletePost);

module.exports = router;
