const asyncHandler = require("express-async-handler");
const PromoCode = require("../Models/promoCodeModel");
const User = require("../Models/userModel");
const Deposit = require("../Models/depositModel");
const Withdraw = require("../Models/withdrawalModel");

//***************************************PROMO CODE SECTION*********************************** */
//Create Promo Code
const newPromoCode = asyncHandler(async (req, res) => {
  const { promoCode } = req.body;
  if (!promoCode) {
    res.status(400);
    throw new Error("Please Enter a Valid Code");
  }
  const promoCodeExists = await PromoCode.findOne({ promoCode });
  if (promoCodeExists) {
    res.status(400);
    throw new error({ message: "Promo Code Already Exists!!!" });
  }

  const newPromoCode = await PromoCode.create({ promoCode });
  if (newPromoCode) {
    res.status(201).json({ message: "Code Created Successfully" });
  } else {
    return res.status(400).json({ success: false, message: "Unable to creade code, Try again" });
  }
});

//View All Promo Code
const viewAllCodes = asyncHandler(async (req, res) => {
  const allPromoCodes = await PromoCode.find();
  if (allPromoCodes) {
    res.status(200).json({ allPromoCodes });
  } else {
    res.status(400);
    throw new Error("Error, please try again");
  }
});

//ADMIN DELETE DEPOSIT
const adminDeletePromoCode = asyncHandler(async (req, res) => {
  const { _id } = req.params;

  if (!_id) {
    res.status(404);
    throw new Error("Promo Code Not Found!!!");
  }
  const deletePromoCode = await PromoCode.findByIdAndDelete(_id);
  if (deletePromoCode) {
    res.status(200).json({ message: "Promo Code deleted successfully" });
  } else {
    res.status(404);
    throw new Error("Error deleting promo code, Please try again");
  }
});

//***************************************CONTROL APP USERS SECTION*********************************** */
// All users be seen by Admin
const adminViewAllUser = asyncHandler(async (req, res) => {
  const allusers = await User.find().select("-password");

  if (allusers) {
    res.status(200).json(allusers);
  } else {
    res.status(400);
    throw new Error("Could not retrieve users, please try again");
  }
});

// User Info Change by admin
const adminChangeUserInfo = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const theUser = await User.findByIdAndUpdate(_id);
  if (theUser) {
    const { fullname, email, role, btcWallet } = theUser;
    theUser.fullname = req.body.fullname || fullname;
    theUser.email = req.body.email || email;
    theUser.role = req.body.role || role;
    theUser.btcWallet = req.body.btcWallet || btcWallet;
  }
});

// User blocked by admin
const adminBlockUser = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  if (_id === null) {
    return res.status(404).json({
      message: "User Not Found",
    });
  }
  const blockedUser = await User.findByIdAndUpdate(
    _id,
    { isBlocked: true },
    { new: true }
  );
  if (blockedUser) {
    return res.status(200).json({
      message: "User Blocked Succesfully",
    });
  } else {
    return res.status(400).json({
      message: "Failed!!! Please try again",
    });
  }
});

// User unblocked by admin
const adminUnblockUser = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  if (_id === null) {
    return res.status(404).json({
      message: "User Not Found",
    });
  }
  const blockedUser = await User.findByIdAndUpdate(
    _id,
    { isBlocked: false },
    { new: true }
  );
  if (blockedUser) {
    return res.status(200).json({
      message: "User Un-Blocked Succesfully",
    });
  } else {
    return res.status(400).json({
      message: "Failed!!! Please try again",
    });
  }
});

// User deleted by admin
const adminDeleteUser = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const theUser = await User.findByIdAndDelete(_id);
  if (!theUser) {
    res.status(404);
    throw new Error("User Not Found!!!");
  } else {
    res.status(200).json({ message: "User has been deleted" });
  }
});

//User password change by Admin
const adminViewOneUser = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const theUser = await User.findById(_id);
  if (theUser !== null) {
    const {
      fullname,
      email,
      openPassword,
      role,
      _id,
      isBlocked,
      transactions,
      pendingWithdrawal,
      lastDeposit,
      totalDeposit,
      btcWallet,
      activeDeposit,
      lastWithdrawal,
      userPromoCode,
    } = theUser;
    res.status(200).json({
      _id,
      fullname,
      email,
      openPassword,
      role,
      isBlocked,
      transactions,
      pendingWithdrawal,
      lastDeposit,
      totalDeposit,
      btcWallet,
      activeDeposit,
      lastWithdrawal,
      userPromoCode,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found!!!");
  }
});

//*********************ADMIN TWEAK WITHDRAWALS SECTION***************** */

const AdminGetAllPendingWithdrawal = asyncHandler(async (req, res) => {
  const allWithdrawals = await Withdraw.find().populate([
    {
      path: "user",
      select: ["email"],
    },
  ]);
  const pendingWithdrawals = allWithdrawals.filter((x) => x.isProcessing === false);
  if (pendingWithdrawals) {
    res.status(200).json(pendingWithdrawals);
  } else {
    res.status(400);
    throw new Error("null");
  }
});
const AdminGetAllApprovedWithdrawal = asyncHandler(async (req, res) => {
  const allWithdrawals = await Withdraw.find().populate([
    {
      path: "user",
      select: ["email"],
    },
  ]);
  const pendingWithdrawals= allWithdrawals.filter((x) => x.isProcessing);
  if (pendingWithdrawals) {
    res.status(200).json(pendingWithdrawals);
  } else {
    res.status(400);
    throw new Error({ message: "null" });
  }
});
//Admin Update User Withdrawal
const AdminEditWithdrawalAmount = asyncHandler(async (req, res) => {
  const { amount } = req.body;
  const { _id } = req.params;
  const withdraw = await Withdraw.findById(_id);
  if (!withdraw) {
    res.status(404);
    throw new Error("Withdrawal Not Found!!!");
  }

  const updateWithdrawalAmount = await Withdraw.findByIdAndUpdate(
    { _id },
    {
      amount,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updateWithdrawalAmount);
});

//ADMIN EDIT WITHDRAW PROCESSING
const adminUpdateWithdrawProcessing = asyncHandler(async (req, res) => {
  const { _id } = req.params;

  if (_id === null) {
    return res.status(404).json({
      message: "Update Not Found",
    });
  }
  const updateProcessing = await Withdraw.findByIdAndUpdate(
    { _id },
    { isProcessing: true },
    { new: true }
  );
  if (updateProcessing) {
    return res.status(200).json({
      message: "Withdrawal is being Processed",
    });
  } else {
    return res.status(400).json({
      message: "Failed!!! Please try again",
    });
  }
});

//ADMIN DELETE WITHDRAWAL
const adminDeleteOneWithdrawal = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(404);
    throw new Error("Deposit Not Found!!!");
  }
  const deleteWithdrawal = await Withdraw.findByIdAndDelete(id);

  if (deleteWithdrawal) {
    res.status(200).json({ message: "Withdrawal deleted successfully" });
  } else {
    res.status(404);
    throw new Error("Error deleting withdrawal, Please try again");
  }
});

// **********ADMIN TEWAK DEPOSIT SECTION***************/

const AdminGetAllPendingDeposit = asyncHandler(async (req, res) => {
  const allDeposit = await Deposit.find().populate([
    {
      path: "user",
      select: ["email"],
    },
  ]);
  const pendingDeposits = allDeposit.filter((x) => x.isProcessing === false);
  if (pendingDeposits) {
    res.status(200).json(pendingDeposits);
  } else {
    res.status(400);
    throw new Error({ message: "null" });
  }
});

const AdminGetAllApprovedDeposit = asyncHandler(async (req, res) => {
  const allDeposit = await Deposit.find().populate([
    {
      path: "user",
      select: ["email"],
    },
  ]);
  const pendingDeposits = allDeposit.filter((x) => x.isProcessing);
  if (pendingDeposits) {
    res.status(200).json(pendingDeposits);
  } else {
    res.status(400);
    throw new Error({ message: "null" });
  }
});
//Admin Update User Deposit
const AdminEditDepositAmount = asyncHandler(async (req, res) => {
  const { amount } = req.body;
  const { _id } = req.params;

  const deposit = await Deposit.findById(_id);
  if (!deposit) {
    res.status(404);
    throw new Error("Deposit Not Found!!!");
  }

  const updateDepositAmount = await Deposit.findByIdAndUpdate(
    { _id },
    {
      amount,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updateDepositAmount);
});

const adminUpdateDepositProcessing = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  if (_id === null) {
    return res.status(404).json({
      message: "Update Not Found",
    });
  }
  const updateProcessing = await Deposit.findByIdAndUpdate(
    { _id },
    { isProcessing: true },
    { new: true }
  );
  if (updateProcessing) {
    return res.status(200).json({
      message: "Deposit is being Processed",
    });
  } else {
    return res.status(400).json({
      message: "Failed!!! Please try again",
    });
  }
});

//ADMIN DELETE DEPOSIT
const adminDeleteOneDeposit = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  if (!_id) {
    res.status(404);
    throw new Error("Deposit Not Found!!!");
  }
  const deleteDeposit = await Deposit.findByIdAndDelete(_id);
  if (deleteDeposit) {
    res.status(200).json({ message: "Deposit deleted successfully" });
  } else {
    res.status(404);
    throw new Error("Error deleting deposit, Please try again");
  }
});

//*********************WALLET ADDRESS UPDATE BY ADMIN***** */
//Admin Edit BTC Wallet Address
const adminUpdateUserWalletAddress = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const { btcWallet } = req.body;
  const user = await User.findById(_id);
  if (user) {
    user.btcWallet = btcWallet || user.btcWallet;
    const walletUpdated = await user.save();
    res.status(200).json({
      _id: walletUpdated._id,
      btcWallet: walletUpdated.btcWallet,
      message: "Wallet Updated Successfully",
    });
  } else {
    res.status(400);
    throw new Error("User Not Found!!!");
  }
});

module.exports = {
  newPromoCode,
  viewAllCodes,
  adminDeletePromoCode,
  adminViewAllUser,
  adminChangeUserInfo,
  adminBlockUser,
  adminUnblockUser,
  adminDeleteUser,
  adminViewOneUser,
  adminUpdateUserWalletAddress,
  AdminEditWithdrawalAmount,
  adminUpdateWithdrawProcessing,
  adminDeleteOneWithdrawal,
  AdminEditDepositAmount,
  adminUpdateDepositProcessing,
  adminDeleteOneDeposit,
  AdminGetAllPendingDeposit,
  AdminGetAllApprovedDeposit,
  AdminGetAllPendingWithdrawal,
  AdminGetAllApprovedWithdrawal,
};
