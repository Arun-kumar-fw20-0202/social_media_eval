const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: { type: String },
  body: { type: String },
  device: { type: String },
});

const PostModel = mongoose.model("user", postSchema);
module.exports = PostModel;
