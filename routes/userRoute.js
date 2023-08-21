const express = require("express");
const UserModel = require("../model/usermodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const alreadyUser = await UserModel.findOne({ email });
    console.log(alreadyUser);
    if (alreadyUser) {
      res.status(200).json({ msg: "User Already Present" });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (hash) {
          const user = new UserModel({ email, password: hash });
          await user.save();
          res.status(200).json({ msg: "user registered successfull", user });
        } else {
          res.status(500).json({ msg: "user regisration failed try again" });
        }
      });
    }
  } catch (error) {
    res.status(400).json({ error: err.message });
  }
});
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const alreadyUser = await UserModel.findOne({ email });
    if (alreadyUser) {
      bcrypt.compare(password, alreadyUser.password, (err, result) => {
        if (result) {
          let token = jwt.sign(
            { userId: alreadyUser._id },
            process.env.secrate
          );
          res.status(200).json({ msg: "Login successfull", token });
        } else {
          res.status(200).json({ msg: "Wrong Password" });
        }
      });
    } else {
      res.status(200).json({ msg: "User Not Found...!" });
    }
  } catch (error) {
    res.status(400).json({ error: err.message });
  }
});
module.exports = userRouter;
