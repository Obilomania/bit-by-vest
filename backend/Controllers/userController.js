const asyncHandler = require("express-async-handler");
const Deposit = require("../Models/depositModel");
const User = require("../Models/userModel");
const Withdraw = require("../Models/withdrawalModel");

//**********************USER  DEPOSIT SECTION ************/
const createDeposit = asyncHandler(async (req, res) => {
  const user = await User.findById(req.id);

  const { plan, amount, transactionID } = req.body;

  if (!plan || !amount || !transactionID) {
    res.status(400);
    throw new Error("Please fill all required fields");
  }
  if (amount < 50) {
    res.status(400);
    throw new Error("Cannot make a deposit of less than $50");
  }

  //Create Deposit
  const deposit = await Deposit.create({
    user: user._id,
    plan,
    amount,
    transactionID,
  });
  await user.save();
  res.status(201).json(deposit);
});

//USER VIEW ALL DEPOSIT
const viewAllDeposit = asyncHandler(async (req, res) => {
  const user = await User.findById(req.id);

  const allDeposit = await Deposit.find({ user: user._id }).sort("-createdAt");
  if (allDeposit.length < 1) {
    return res.status(400).json({ success: false, message: "No deposit made" });
  }
  res.status(200).json(allDeposit);
});

//USER LAST DEPOSIT AMOUNT
const userLastDepositAmount = asyncHandler(async (req, res) => {
  const user = await User.findById(req.id);

  const userLastDeposit = await Deposit.find({ user: user._id }).sort(
    "-createdAt"
  );
  // if (userLastDeposit.length === 0) {
  //   res.status(400);
  //   throw new Error({ message: "null" });
  // }
  const latestDepositAmount = userLastDeposit[0]?.amount;
  if (!latestDepositAmount) {
    return res.status(400).json({ success: false, message: 0 });
  }
  res.status(200).json(latestDepositAmount);
});

// USER LAST DEPOSIT
const theUserLastDeposit = asyncHandler(async (req, res) => {
  const user = await User.findById(req.id);

  const userLastDeposit = await Deposit.find({ user: user._id }).sort(
    "-createdAt"
  );

  // if (userLastDeposit.length === 0) {
  //   res.status(400);
  //   throw new Error({ message: "null" });
  // }
  let latestDeposit = userLastDeposit[0];
  if (!latestDeposit) {
   return res.status(400).json({ success: false, message: "No Deposit Made" });
  }
  res.status(200).json(latestDeposit);
});

//User Pending Depoit
const userPendingDeposit = asyncHandler(async (req, res) => {
  const user = await User.findById(req.id);

  const pendingDeposit = await Deposit.find({ user: user._id }).sort(
    "-createdAt"
  );
  // if (pendingDeposit.length === 0) {
  //   res.status(400);
  //   throw new Error({ message: "null" });
  // }

  const userPendingDeposit = pendingDeposit.filter((obj) => !obj.isProcessing);

  if (userPendingDeposit?.length === 0) {
    return res.status(400).json({ success: false, message:"No deposit found" });
  }
  res.status(200).json(userPendingDeposit);
});

//User Pending Deposit total
const userPendingDepositTotal = asyncHandler(async (req, res) => {
  const user = await User.findById(req.id);
  const userLastDeposit = await Deposit.find({ user: user._id }).sort(
    "-createdAt"
  );
  if (userLastDeposit.length === 0) {
    return res.status(400).json({ success: false, message: 0 });
  }
  const latestDeposit = userLastDeposit.filter((obj) => !obj.isProcessing);
  const pendingDepositTotal = latestDeposit?.reduce((acc, object) => {
    return acc + object.amount;
  }, 0);
  res.status(200).json(pendingDepositTotal);
});

//User Deposit total Amount
const userDepositTotalAmount = asyncHandler(async (req, res) => {
  const user = await User.findById(req.id);
  const allUserDeposit = await Deposit.find({ user: user._id }).sort(
    "-createdAt"
  );
  if (allUserDeposit.length === 0) {
    return res.status(400).json({ success: false, message: 0 });
  } else {
    const pendingDeposits = allUserDeposit.filter((obj) => !obj.isProcessing);
    const approvedDeposit = allUserDeposit.filter((obj) => obj.isProcessing);
    const pendingTot = pendingDeposits?.reduce((acc, object) => {
      return acc + object.amount;
    }, 0);
    const approvedTot = approvedDeposit?.reduce((acc, object) => {
      return acc + object.amount;
    }, 0);
    res.status(200).json(approvedTot);
  }
});

//*********************************USER WITHDRAW SECTION************ */
//USER CREATE WITHDRAWAL
const createWithdrawal = asyncHandler(async (req, res) => {
  const user = await User.findById(req.id);

  const { amount } = req.body;
  if (!amount) {
    res.status(400);
    throw new Error("Please fill all required field");
  }
  if (amount < 50) {
    res.status(400);
    throw new Error("Cannot make a withdrawal of less than $50");
  }
  const allUserDeposit = await Deposit.find({ user: user._id });
  const approvedDeposit = allUserDeposit?.filter((obj) => obj.isProcessing);
  const userTotalDepositAmount = approvedDeposit?.reduce((acc, object) => {
    return acc + object?.amount;
  }, 0);
  if (amount > userTotalDepositAmount) {
   res.status(400);
   throw new Error("Insufficient Funds");
  }

  //Create Withdrawal
  const withdrawal = await Withdraw.create({
    user: user._id,
    wallet: user.btcWallet,
    amount,
  });
  await user.save();
  res.status(201).json(withdrawal);
});

//USER VIEW ALL WITHDRAWAL
const viewAllWithdrawal = asyncHandler(async (req, res) => {
  const user = await User.findById(req.id);

  const allWithdrawal = await Withdraw.find({ user: user._id }).sort(
    "-createdAt"
  );
  if (allWithdrawal.length < 1) {
    return res.status(400).json({ success: false, message:"No withdrawal made" });
  }
  res.status(200).json(allWithdrawal);
});

//USER LAST WITHDRAWAL AMOUNT
const userLastWithdrawalAmount = asyncHandler(async (req, res) => {
  const user = await User.findById(req.id);

  const userLastWithdraw = await Withdraw.find({ user: user._id }).sort(
    "-createdAt"
  );
  if (userLastWithdraw.length === 0) {
    return res.status(400).json({ success: false, message: 0 });
  } else {
    res.status(200).json(userLastWithdraw[0]?.amount);
  }
});


const userPendingWithdrawals = asyncHandler(async (req, res) => {
  const user = await User.findById(req.id);

  const allWithdrawal = await Withdraw.find({ user: user._id });

  if (allWithdrawal.length < 1 || !allWithdrawal) {
    return res.status(400).json({ success: false, message: "No pending Withdrawals" });
  } else {
    const processingTransactions = allWithdrawal.filter(
      (transaction) => !transaction.isProcessing
    );
   
    res.status(200).json(processingTransactions);
  }
});
//USER VIEW PENDING WITHDRAWALS
const userTotalPendingWithdrawals = asyncHandler(async (req, res) => {
  const user = await User.findById(req.id);

  const allWithdrawal = await Withdraw.find({ user: user._id });

  if (allWithdrawal.length < 1 || !allWithdrawal) {
    return res.status(400).json({ success: false, message: 0 });
  } else {
    const processingTransactions = allWithdrawal.filter(
      (transaction) => !transaction.isProcessing
    );
    const totalPending = processingTransactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    );
    res.status(200).json(totalPending);
  }
});

//USER TOTAL WITHDRAWAL
const userTotalWithdrawalAmount = asyncHandler(async (req, res) => {
  const user = await User.findById(req.id);

  const allWithdrawal = await Withdraw.find({ user: user._id });
  if (!allWithdrawal) {
    allWithdrawal = 0;
  }
  const approvedWithdrawal = allWithdrawal?.filter(x => x.isProcessing)
  const totalWithdrawalAmount = approvedWithdrawal?.reduce((acc, object) => {
    return acc + object.amount;
  }, 0);
  res.status(200).json(totalWithdrawalAmount);
});

//USER ACCOUNT BALANCE
const userAccountBalance = asyncHandler(async (req, res) => {
  const user = await User.findById(req.id);
  let totalBalance;
  const allWithdrawal = await Withdraw.find({ user: user._id });
  const approvedWithdrawals = allWithdrawal?.filter((obj) => obj.isProcessing);
  const allUserDeposit = await Deposit.find({ user: user._id });
  const approvedDeposit = allUserDeposit?.filter((obj) => obj.isProcessing);

  const totalWithdrawalAmount = approvedWithdrawals?.reduce((acc, object) => {
    return acc + object?.amount;
  }, 0);
  const userTotalDepositAmount = approvedDeposit?.reduce((acc, object) => {
    return acc + object?.amount;
  }, 0);

  totalBalance = userTotalDepositAmount - totalWithdrawalAmount;

  res.status(200).json(totalBalance);
});

//ALL USER TRANSACTION LIST
const userTransactionList = asyncHandler(async (req, res) => {
  const user = await User.findById(req.id);
  const allWithdrawal = await Withdraw.find({ user: user._id });
  const allUserDeposit = await Deposit.find({ user: user._id });
  const alltransaction = allWithdrawal + allUserDeposit;

  res.status(200).json(alltransaction);
});

module.exports = {
  createDeposit,
  viewAllDeposit,
  userLastDepositAmount,
  theUserLastDeposit,
  userPendingDeposit,
  userPendingDepositTotal,
  userDepositTotalAmount,
  createWithdrawal,
  viewAllWithdrawal,
  userPendingWithdrawals,
  userLastWithdrawalAmount,
  userTotalPendingWithdrawals,
  userTotalWithdrawalAmount,
  userAccountBalance,
  userTransactionList,
};
