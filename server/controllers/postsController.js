const Post = require("../models/post");

//Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.send(posts).status(200);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//Get post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    res.send(post).status(200).json({
      message: "Post fetched!",
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

//Create post
exports.addPost = async (req, res) => {
  try {
    const { title, content, author, created_at, modified_at } = req.body;

    await Post.create({
      title,
      content,
      author,
      created_at,
      modified_at,
    });
    res.status(200).json({
      message: "Post added successfully",
    });
  } catch (err) {
    res.status(401).json({
      message: "Failed to add post",
      error: err.message,
    });
  }
};

// Update a post *in progress*

exports.updatePost = async (req, res) => {
  try {
    const post = new Post({
      _id: req.params.id,
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      created_at: req.body.created_at,
      modified_at: req.body.modified_at,
      comments: req.body.comments,
    });
    await Post.updateOne({ _id: req.params.id }, post);
    res.status(201).json({
      message: "Post updated successfully!",
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    res.status(200).json({
      message: "Deleted!",
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};
