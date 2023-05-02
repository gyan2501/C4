const express = require("express");
const { PostModel } = require("../model/Post.model");

const postRouter = express.Router();

//CREATE POST ROUTE
postRouter.post("/create", async (req, res) => {
  try {
    const post = await PostModel(req.body);
    await post.save();
    res.status(200).send({ msg: "New Post added" });
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

//GET POST ROUTE
postRouter.get("/", async (req, res) => {
  try {
    const filterPost = {};
    if (req.query.authorId) {
      filterPost.authorId = req.query.authorId;
    }

    if (req.query.device) {
      filterPost.device = req.query.device;
    }

    const post = await PostModel.find(filterPost);

    res.status(200).send(post);
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

//UPDATE POST ROUTE
postRouter.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  const note = await PostModel.findOne({ _id: id });

  try {
    if (req.body.authorId !== note.authorId) {
      res.status(200).send({ msg: "Not A Authorised User to this action" });
    } else {
      await PostModel.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).send({ msg: "Post Updated successfully!!" });
    }
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

//Delete POST ROUTE
postRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const note = await PostModel.findOne({ _id: id });

  try {
    if (req.body.authorId !== note.authorId) {
      res.status(200).send({ msg: "Not A Authorised User to this action" });
    } else {
      await PostModel.findByIdAndDelete(id, req.body, { new: true });
      res.status(200).send({ msg: "Post Deleted successfully!!" });
    }
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

module.exports = {
  postRouter,
};
