const express = require("express");
const { registerNewUser, loginUser, userLogOut, editUserProfile, viewUserProfile, userDeleteProfile, checkLoginStatus, userChangePassord, forgotPassowrd, resetPaassword } = require("../Controllers/authController");
const { verifyToken } = require("../Middlewares/verifyToken");



const router = express.Router();



router.post("/registration", registerNewUser);
router.post("/login", loginUser);
router.get("/logout", userLogOut);
router.get("/authstatus", verifyToken, checkLoginStatus);
router.get("/viewmyprofile", verifyToken, viewUserProfile);
router.put("/editprofile",verifyToken, editUserProfile);
router.delete("/deletemyprofile", verifyToken, userDeleteProfile);
router.put("/changepassword", verifyToken, userChangePassord);
router.post("/forgotpassword", verifyToken, forgotPassowrd);
router.post("/resetpassword/:resettoken", verifyToken, resetPaassword);










module.exports = router;
