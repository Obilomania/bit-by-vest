const bCrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
const PromoCode = require("../Models/promoCodeModel");
const { sendWelcomeEmail, sendPasswordResetEmail } = require("../MailTrap/emails");
const dotenv = require("dotenv").config();
const crypto = require("crypto");
const Token = require("../Models/tokenModel")

// ***************************REGISTRATION CONTROLLER******************************\\
const registerNewUser = asyncHandler(async (req, res) => {
  let { fullname, email, password, btcWallet, openPassword, userPromoCode } =
    req.body;
  if ((!fullname, !email, !password, !btcWallet)) {
    res.status(400);
    throw new Error("Please fill in all required fields Brotherly Men");
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be up to 6 characters");
  }
  const user = await User.findOne({ email: email.toLowerCase() });
  if (user) {
    res.status(400);
    throw new Error("Email already in use, Try again");
  }

  let theCode = await PromoCode.find().select("promoCode");
  let eachPromoCode = theCode.map((item) => item.promoCode);
  if (!userPromoCode || userPromoCode === "") {
    userPromoCode = "NO CODE USER";
    // theCode === "NO CODE USER"
  }

  if (!eachPromoCode.includes(userPromoCode)) {
    res.status(400);
    throw new Error("Promo Code does not exists");
  }
  const newUser = await User.create({
    fullname,
    email,
    password,
    btcWallet,
    openPassword,
    userPromoCode,
  });
  await sendWelcomeEmail(newUser.email, newUser.fullname);
  if (newUser) {
    const { _id, fullname, role, email, btcWallet, userPromoCode } = newUser;
    res.status(201).json({
      _id,
      fullname,
      role,
      email,
      btcWallet,
      userPromoCode,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User data");
  }
});

// ***************************LOGIN CONTROLLER******************************\\
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findOne({ email }).exec();

  if (!user) {
    return res.status(401).json({ message: "user not found" });
  }

  if (user.isBlocked) {
    return res.status(401).json({ message: "User blocked, Contact admin" });
  }

  const passwordIsValid = await bCrypt.compare(password, user.password);

  if (!passwordIsValid)
    return res.status(401).json({ message: "Invalid Password" });

  //****************************************Generate JWT TOKEN******************
  const token = jwt.sign(
    {
      id: user._id,
      fullname: user.fullname,
      role: user.role,
      email: user.email,
      btcWallet: user.btcWallet,
      isBlocked: user.isBlocked,
      promoCode: user.userPromoCode,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    path: "/",
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
  });
  // secure: process.env.NODE_ENV === "production",

  if (user && passwordIsValid) {
    const { _id, fullname, role, email, btcWallet, userPromoCode } = user;
    res.status(200).json({
      _id,
      fullname,
      role,
      email,
      btcWallet,
      userPromoCode,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or passowrd");
  }
});

const userLogOut = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  return res.status(200).json({
    message: "Successfully Logged out",
  });
});

// login status
const checkLoginStatus = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.id).select(["-password","-openPassword"]);
    if (!user) {
      res
        .status(400)
        .json({ success: false, message: "User Not Found" });
    }
    res.status(200).json({message:true, user})
  } catch (error) {
    console.log("Error in Loginstatus", error)
    res
      .status(400)
      .json({ success: false, message: error.message });
  }
  
});

// View Profile
const viewUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.id);
  if (user) {
    const { fullname, email, role, _id, btcWallet } = user;
    res.status(201).json({
      _id,
      fullname,
      email,
      role,
      btcWallet,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found!!!");
  }
});

// Edit Profile
const editUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.id);
  if (user) {
    const { fullname, email, btcWallet } = user;
    user.fullname = req.body.fullname || fullname;
    user.btcWallet = req.body.btcWallet || btcWallet;
    user.email = req.body.email || email;

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      fullname: updatedUser.fullname,
      email: updatedUser.email,
      btcWallet: updatedUser.btcWallet,
    });
  } else {
    res.status(400);
    throw new Error("User Not Found");
  }
});

const userDeleteProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.id);

  if (!user) {
    res.status(404);
    throw new Error("Error, Please try again or contact Admin");
  } else {
    res.status(200).json({ message: "Account deleted successfully" });
  }
});

//Change Password
const userChangePassord = asyncHandler(async (req, res) => {
  const user = await User.findById(req.id);
  const { oldPassword, newPassword } = req.body;

  if (!user) {
    res.status(404);
    throw new Error("Error, Please try again");
  }
  if (!oldPassword || !newPassword) {
    res.status(400);
    throw new Error("Please fill all inputs");
  }

  const oldPasswordIsCorrect = await bCrypt.compare(oldPassword, user.password);

  if (oldPasswordIsCorrect) {
    user.password = newPassword;
    user.openPassword = newPassword;
    await user.save();
    res.status(200).json({ message: "Password changed successfully" });
  } else {
    res.status(400);
    throw new Error("old password is incorrect");
  }
});

const forgotPassowrd = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User Not Found", success: false });
  }
  let token = await Token.findOne({ userId: user._id });
  if (token) {
    await token.deleteOne();
  }
  //Generate reset token
  let resetToken = crypto.randomBytes(20).toString("hex") + user._id;
   const hashedToken = crypto
     .createHash("sha256")
     .update(resetToken)
     .digest("hex");
  
  await new Token({
    userId: user._id,
    token: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 10 * (60 * 1000), //thirty Minutes
  }).save();

const resetURL = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

try {
  await sendPasswordResetEmail(user.email, resetURL);
  res.status(200).json({ success: true, message: "Reset email sent" });
} catch (error) {
  return res.status(400).json({success: false , message : error.message});
}
});



const resetPaassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { resetToken } = req.params;

  //Hash token and compare to the token in DB
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  
  try {
    //Find Token in DB
  const userToken = await Token.findOne({
    token: hashedToken,
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    return res.status(400).json({ success: false, message: "Invalid or Expired token" });
  }

  //find user if token has not expired
  const user = await User.findOne({ _id: userToken.userId });

  //Set User password
  user.password = password;
  await user.save();

  res.status(200).json({ message: "Password reset successful, please log in" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
})

module.exports = {
  registerNewUser,
  loginUser,
  userLogOut,
  checkLoginStatus,
  viewUserProfile,
  editUserProfile,
  userDeleteProfile,
  userChangePassord,
  forgotPassowrd,
  resetPaassword
};
