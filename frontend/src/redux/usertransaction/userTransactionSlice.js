import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userLastDepositAmount: 0,
  userPendingDepositAmount: 0,
  userTotalDepositAmount: 0,
  userAccountBalance: 0,
  userLastWithdrawalAmount: 0,
  userPendingWithdrawalTotal: 0,
  userWithdarwalTotalAmount: 0,
  userWithdrawalList: null,
  userDepositList: null,
  userTransactionList: null
}

const userTransactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    user_last_deposit_amount: (state, action) => {
      state.userLastDepositAmount = action.payload
    },
    user_pending_ddeposit_amount: (state, action) => {
      state.userPendingDepositAmount = action.payload
    },
    user_deposit_total_amount: (state, action) => {
      state.userTotalDepositAmount = action.payload
    },
    user_account_balance: (state, action) => {
      state.userAccountBalance = action.payload
    },
    user_last_withdrawal_amount: (state, action) => {
      state.userLastWithdrawalAmount = action.payload
    },
    user_pending_withdrawal_total: (state, action) => {
      state.userPendingWithdrawalTotal = action.payload
    },
    user_withdrawal_total_amount: (state, action) => {
      state.userWithdarwalTotalAmount = action.payload
    },
    user_withdrawal_list: (state, action) => {
      state.userWithdrawalList = action.payload
    },
    user_deposit_list: (state, action) => {
      state.userDepositList = action.payload
    },
    user_transaction_list: (state, action) => {
      state.userTransactionList = action.payload
    },
    resetUserTransactions: (state) => {
      state.userLastDepositAmount = 0;
      state.userPendingDepositAmount = 0;
      state.userTotalDepositAmount = 0;
      state.userAccountBalance = 0;
      state.userLastWithdrawalAmount = 0;
      state.userPendingWithdrawalTotal = 0
      state.userWithdarwalTotalAmount = 0
      state.userWithdrawalList = null;
      state.userDepositList = null;
      state.userTransactionList = null
    }
  }
});

export const { user_last_deposit_amount, resetUserTransactions, user_pending_ddeposit_amount, user_deposit_total_amount, user_account_balance, user_last_withdrawal_amount, user_pending_withdrawal_total, user_withdrawal_total_amount, user_withdrawal_list, user_deposit_list, user_transaction_list } = userTransactionSlice.actions

export const userTransactionReducer = userTransactionSlice.reducer