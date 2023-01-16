const Post = require("../models/post.models")
exports.createPost = async (req, res) => {
  const { title, body, device } = req.body;
  let userID = req.user._id;
  console.log(userID);
  try {
    const newPost = await Post.create({
      title,
      body,
      device,
      userID,
    });

    return res.status(201).json({
      status: "success",
      message: newPost,
    });
  } catch (err) {
    return res.status(404).json({
      status: "error",
      error: err,
    });
  }
};

exports.getPosts = async (req, res) => {
  let query = req.query;
  query = Object.values(query);

  try {
    let posts;
    if (query.length === 0) {
      posts = await Post.find();
    } else {
      posts = await Post.find({ device: query });
    }
    // console.log("posts:", posts);
    return res.status(201).json({
      status: "success",
      message: posts,
    });
  } catch (err) {
    return res.status(404).json({
      status: "error",
      error: err,
    });
  }
};

exports.getPost = async (req, res) => {
  let id = req.params.id;
  try {
    const posts = await Post.findById(id);
    // console.log("posts:", posts);
    return res.status(201).json({
      status: "success",
      message: posts,
    });
  } catch (err) {
    return res.status(404).json({
      status: "error",
      error: err,
    });
  }
};
exports.deletePost = async (req, res) => {
  let id = req.params.id;

  try {
    const posts = await Post.findByIdAndDelete(id, { new: true });
    // console.log("posts:", posts);
    return res.status(201).json({
      status: "success",
      message: "posts deleted succesfully",
    });
  } catch (err) {
    return res.status(404).json({
      status: "error",
      error: err,
    });
  }
};
exports.updatePost = async (req, res) => {
  let id = req.params.id;
  console.log("id:", id);

  const { title, body, device } = req.body;
  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { title, body, device },
      { new: true }
    );
    // console.log("posts:", posts);
    return res.status(201).json({
      status: "success",
      message: post,
    });
  } catch (err) {
    return res.status(404).json({
      status: "error",
      error: err,
    });
  }
};