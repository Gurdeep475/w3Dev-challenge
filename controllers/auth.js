const { validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncWrapper = require("../helpers/asyncWrapper");

// Registration of a New User
exports.register = asyncWrapper(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ message: "Some Error Occured", error: errors });
  }
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const createdUser = await User.create({
    username,
    password: hashedPassword,
  });
  res.json({ message: "User Created Successfully" });
});

// Login of a New User
exports.login = asyncWrapper(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ message: "Some Error Occured", error: errors });
  }

  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    throw new Error("Invalid Username/Password");
  }

  const matchPassword = await bcrypt.compare(password, user.password);

  if (matchPassword) {
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET
    );
    return res.json({ status: "Ok", token: token });
  } else {
    throw new Error("Invalid Username/Password");
  }
});

// Resetting Password using JWT Token
exports.changePassword = asyncWrapper(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ message: "Some Error Occured", error: errors });
  }

  const { password } = req.body;
  if (!token) {
    throw new Error("Please Login to Change Password");
  }
  const token = req.headers.authorization.split(" ")[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findOne({ _id: decoded.id });
  if (!user) {
    throw new Error("Invalid Token");
  }
  const newPassword = await bcrypt.hash(password, 10);
  await User.updateOne({ _id: decoded.id }, { password: newPassword });
  return res.json({ message: "Password Reset Successfully" });
})

// Validates whether a user is loggedIn or Not, for protecting routes
exports.isAuthenticated = asyncWrapper(async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.json({ message: "Please Login, to change Password" });
  }
  const token = req.headers.authorization.split(" ")[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findOne({ _id: decoded.id });
  if (!user) {
    throw new Error("Invalid Token");
  }
  req.user = user;
  next();
})
