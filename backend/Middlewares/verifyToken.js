const User = require("../Models/userModel");
const jsonweb = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv").config();



const verifyToken = (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        res.status(401).json({ success: false, message: "Unauthorized, No token provided" });
    }
    try {
        const verified = jsonweb.verify(token, process.env.JWT_SECRET);
        
        if (!verified) res.status(401).json({ success: false, message: "Unauthorized, No token provided" });
        req.id = verified.id
        next()
    } catch (error) {
        res
          .status(500)
          .json({ success: false, message: "Server Error, Try again Later." });
    }
}

const verifyAdminToken = async (req, res, next) => {
    const user = await User.findById(req.id);
     if (user.role === "Admin") {
       next();
     } else {
        res
          .status(405)
          .json({ success: false, message: "User not an Admin" });
     }
}

module.exports={verifyToken, verifyAdminToken}