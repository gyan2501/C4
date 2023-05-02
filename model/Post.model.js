const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    title: String,
    body: String,
    device: String,
    authorId: String,
  },
  {
    versionKey: false,
  }
);

const PostModel = mongoose.model("Post", PostSchema);

module.exports = {
  PostModel,
};
