const express = require("express");
const PostModel = require("../models/post.model");
const postRouter = express.Router();
postRouter.use(express.json());

postRouter.get("/", async (req, res) => {
  try {
    const post = await PostModel.find({ authoID: req.body.authoID });
    res.setMaxListeners(200).send(post);
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

postRouter.post("/add", async (req, res) => {
  let payload = req.body;
  try {
    let data = new PostModel(payload);
    await data.save();
    res.status(200).send({ msg: "Pots has beed added!!" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

postRouter.patch("/update/:postId", async (req, res) => {
  let { postId } = req.params;
  try {
    await PostModel.findByIdAndUpdate({ _id: postId }, req.body);
    res.status(200).send({ msg: "The post has beed updated!!" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

postRouter.delete("/delete/:postId", async (req, res) => {
  let { postId } = req.params;
  try {
    await PostModel.findByIdAndDelete({ _id: postId });
    res.status(200).send({ msg: "The post has beed Deleted!!" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

module.exports = postRouter;
