const express = require("express");
const postController = require("./../controller/post.controller");
const authMiddleware = require("./../middleware/auth.middleware");

const router = express.Router();

router
  .route("")
  .post(authMiddleware.protect, postController.createPost)
  .get(authMiddleware.protect, postController.getPosts);
router
  .route("/:id")
  .get(authMiddleware.protect, postController.getPost)
  .delete(authMiddleware.protect, postController.deletePost)
  .patch(authMiddleware.protect, postController.updatePost);
module.exports = router;
