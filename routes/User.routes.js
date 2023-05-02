const express = require("express");
const { UserModel } = require("../model/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRouter = express.Router();

// REGISTER ROUTE
userRouter.post("/register", async (req, res) => {
  const { name, email, gender, password } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      const user = UserModel({ name, email, gender, password: hash });
      await user.save();
      res.status(200).send({ msg: "New user Registered!!" });
    });
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

// LOGIN ROUTE

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.status(500).send({ err: error.message });
        } else if (result) {
          const token = jwt.sign({ authorId: user._id }, "masai");
          res.status(200).send({ msg: "Login Successfull!!", token: token });
        } else {
          res.status(500).send({ msg: "wrong Credentials" });
        }
      });
    } else {
      res.status(500).send({ msg: "wrong Credentials" });
    }
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
});

module.exports = {
  userRouter,
};
