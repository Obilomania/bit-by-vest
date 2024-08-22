const User = require("../Models/userModel");
const jsonweb = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, please login");
    }
    //verify the authenticity of the token
    const verified = jsonweb.verify(token, process.env.JWT_SECRET)
    //Get User id from token
    const user = await User.findById(verified.id).select("-password");

    if (!user) {
      res.status(401);
      throw new Error("User Not Found!!!");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("User not authorized, please login");
  }
});

const isAdmin = (req, res, next) => {
  if (req.user.role === "Admin") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

module.exports = { protect, isAdmin };
