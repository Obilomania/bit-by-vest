const express = require("express");
const { createDeposit, viewAllDeposit, userLastDepositAmount, theUserLastDeposit, userPendingDepositTotal, userDepositTotalAmount, userPendingDeposit, createWithdrawal, viewAllWithdrawal, userLastWithdrawalAmount, userTotalWithdrawalAmount, userTotalPendingWithdrawals, userAccountBalance, userPendingWithdrawals } = require("../Controllers/userController");
const { verifyToken } = require("../Middlewares/verifyToken");
const router = express.Router();





router.post("/create-new-deposit", verifyToken, createDeposit);
router.get("/all-deposits",verifyToken, viewAllDeposit);
router.get("/user-last-deposit-amount", verifyToken,userLastDepositAmount);
router.get("/the-user-last-deposit", verifyToken,theUserLastDeposit);
router.get("/user-pending-deposit-total", verifyToken,userPendingDepositTotal);
router.get("/user-total-deposit-amount", verifyToken,userDepositTotalAmount);
router.get("/the-pending-deposit", verifyToken,userPendingDeposit);


router.get("/user-account-balance", verifyToken,userAccountBalance);
router.get("/user-transactionList", verifyToken,userAccountBalance);


router.post("/create-withdrawal", verifyToken, createWithdrawal);
router.get("/all-withdrawals", verifyToken, viewAllWithdrawal);
router.get("/pending-withdrawals", verifyToken, userPendingWithdrawals);
router.get("/user-last-withdrawal-amount", verifyToken, userLastWithdrawalAmount);
router.get(
  "/withdrawal-processing-total",
  verifyToken,
  userTotalPendingWithdrawals
);
router.get("/user-total-withdrawal-amount", verifyToken, userTotalWithdrawalAmount);




module.exports = router;
