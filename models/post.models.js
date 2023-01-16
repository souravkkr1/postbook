const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: String,
    body: String,
    device: {
      type: String,
      enum: ["PC", "TABLET", "MOBILE"],
    },
    userID: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
