const express = require("express");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
userRouter.use(express.json());

userRouter.post("/register", async (req, res) => {
  const { name, email, gender, password } = req.body;
  const check = await UserModel.findOne({ email });
  if (check) {
    res.status(200).send({ msg: "User Alredy Exist with this email" });
  } else {
    try {
      bcrypt.hash(passowrd, 5, async (err, hash) => {
        const user = new UserModel({
          name,
          email,
          gender,
          password: hash,
        });
        await user.save();
        res.status(200).send({ msg: "The new user has been added" });
      });
    } catch (err) {
      res.status(400).send({ msg: err.message });
    }
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign({ authorID: user._id }, "masai");
          res.status(200).send({ msg: "Login successful", token: token });
        } else {
          res.status(200).send({ msg: "wrong credentials!!" });
        }
      });
    }
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

module.exports = userRouter;
