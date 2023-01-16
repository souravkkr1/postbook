const User = require("./../models/user.models");
const jwt = require("jsonwebtoken");

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

  req.user = user;
  next();
};
