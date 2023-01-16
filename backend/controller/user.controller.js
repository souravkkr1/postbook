const bcrypt = require("bcrypt");
const User = require("./../models/user.models");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, gender, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 6);

  if (!hashPassword) {
    return res.status(403).json({
      status: "error",
      message: "password is not created,Try AGAIN.",
    });
  }

  try {
    const newUser = await User.create({
      name,
      email,
      gender,
      password: hashPassword,
    });
    newUser.password = undefined;
    newUser.email = undefined;
    res.status(201).json({
      status: "success",
      data: newUser,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      data: null,
    });
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(403).json({
      status: "error",
      message: "user is not found with this email",
    });
  }
  console.log(user);
  const verifyPassowrd = await bcrypt.compare(password, user.password);

  if (!verifyPassowrd) {
    return res.status(403).json({
      status: "error",
      message: "email or password Wrong",
    });
  }

  var token = jwt.sign({ id: user._id }, "masaiSchool");

  if (!token) {
    return res.status(403).json({
      status: "error",
      message: "Please login again",
    });
  }

  res
    .status(200)
    .setHeader("jwt", token)
    .json({
      status: "success",
      data: {
        message: "you have succesfully login",
        token,
      },
    });
};

exports.protect = async (req, res, next) => {
  console.log(req.headers.jwt);
  let decoded;
  if (req.headers && req.headers.jwt) {
    decoded = jwt.verify(req.headers.jwt, "masaiSchool");
  }

  if (!decoded) {
    return res.status(403).json({
      status: "error",
      message: "You are not authenticate",
    });
  }

  const user = await User.findById(decoded.id);

  if (!user) {
    return res.status(403).json({
      status: "error",
      message: "Ypu are not authenticate",
    });
  }

  console.log(user);
  next();
};
