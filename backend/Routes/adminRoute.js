const express = require("express");
const { newPromoCode, viewAllCodes, adminDeletePromoCode, adminViewOneUser, adminDeleteUser, adminUpdateUserWalletAddress, adminUnblockUser, adminViewAllUser, adminChangeUserInfo, adminBlockUser, AdminEditWithdrawalAmount, adminUpdateWithdrawProcessing, adminDeleteOneWithdrawal, adminUpdateDepositProcessing, adminDeleteOneDeposit, AdminGetAllPendingDeposit, AdminGetAllApprovedDeposit, AdminGetAllPendingWithdrawal, AdminGetAllApprovedWithdrawal } = require("../Controllers/adminController");
const { verifyToken, verifyAdminToken } = require("../Middlewares/verifyToken");



const router = express.Router();

router.post("/createpromocode", newPromoCode)
router.get("/allpromocodes", viewAllCodes)
router.delete("/admindeletepromocode/:_id", adminDeletePromoCode);


router.get("/admingetalluser",verifyToken, verifyAdminToken, adminViewAllUser)
router.put("/adminblockuser/:_id",verifyToken, verifyAdminToken, adminBlockUser)
router.put("/adminunblockuser/:_id",verifyToken, verifyAdminToken, adminUnblockUser)
router.put("/adminedituserinformation/:_id",verifyToken, verifyAdminToken, adminChangeUserInfo)
router.delete("/admindeleteuser/:_id",verifyToken, verifyAdminToken, adminDeleteUser)
router.get("/admingetoneuser/:_id", verifyToken, verifyAdminToken, adminViewOneUser)


router.put("/adminupdateuserwalletaddress/:_id",verifyToken, verifyAdminToken, adminUpdateUserWalletAddress)


router.put("/edit-amount/:_id",verifyToken, verifyAdminToken, AdminEditWithdrawalAmount)
router.get(
  "/withdrawal/pending-withdrawals",
  verifyToken,
  verifyAdminToken,
  AdminGetAllPendingWithdrawal
);
router.get("/withdrawal/approved-withdrawals",verifyToken, verifyAdminToken, AdminGetAllApprovedWithdrawal)
router.put("/withdrawal/processing/:_id",verifyToken, verifyAdminToken, adminUpdateWithdrawProcessing)
router.delete("/admin-delete-withdrawal/:_id", verifyToken, verifyAdminToken, adminDeleteOneWithdrawal)


router.get("/deposit/pending-deposits",verifyToken, verifyAdminToken, AdminGetAllPendingDeposit);
router.get("/deposit/approved-deposits",verifyToken, verifyAdminToken, AdminGetAllApprovedDeposit);
router.put("/deposit/processing/:_id",verifyToken, verifyAdminToken, adminUpdateDepositProcessing);
router.delete("/admin-delete-deposit/:_id",verifyToken, verifyAdminToken, adminDeleteOneDeposit);


module.exports = router;