import { useDispatch } from "react-redux"
import { useGetallUserDepositQuery, useGetAllUserWithdrawalsQuery, useGetUserAccountBalanceQuery, useGetUserLastDepositAmountQuery, useGetUserLastWithdrawAmountQuery, useGetUserPendingDepositAmountQuery, useGetUserPendingWithdrawAmountQuery, useGetUserTotalDepositAmountQuery, useGetUserWithdrawTotalAmountQuery } from "../APIs/userTransactionsAPI"
import { user_account_balance, user_deposit_list, user_deposit_total_amount, user_last_deposit_amount, user_last_withdrawal_amount, user_pending_ddeposit_amount, user_pending_withdrawal_total, user_withdrawal_list, user_withdrawal_total_amount } from "../redux/usertransaction/userTransactionSlice"

const useGetUserTransactions = () => {
    const dispatch = useDispatch()

    function GetUserLastDepositAmount() {
        const { data, isLoading } = useGetUserLastDepositAmountQuery(null)
        if (!isLoading) {
            dispatch(user_last_deposit_amount(data))
        }
    }


    function GetUserPendingDeposits() {
        const { data, isLoading } = useGetUserPendingDepositAmountQuery(null)
        if (!isLoading) {
            dispatch(user_pending_ddeposit_amount(data));
        }
    }

    function GetUserTotalDepositAmount() {
        const { data, isLoading } = useGetUserTotalDepositAmountQuery(null)
        if (!isLoading) {
            dispatch(user_deposit_total_amount(data))
        }
    }


    function GetUserAccountBalance() {
        const { data, isLoading } = useGetUserAccountBalanceQuery(null)
        if (!isLoading) {
            dispatch(user_account_balance(data))
        }
    }


    function GetUserLastWithdraw() {
        const { data, isLoading } = useGetUserLastWithdrawAmountQuery(null)
        if (!isLoading) {
            dispatch(user_last_withdrawal_amount(data))
        }
    }

    function GetUserPendingWithdrawTotal() {
        const { data, isLoading } = useGetUserPendingWithdrawAmountQuery(null)
        if (!isLoading) {
            dispatch(user_pending_withdrawal_total(data))
        }
    }

    function GetWithdrawalTotal() {
        const { data, isLoading } = useGetUserWithdrawTotalAmountQuery(null)
        if (!isLoading) {
            dispatch(user_withdrawal_total_amount(data))
        }
    }

    function GetAllUserWithdrawals() {
        const { data, isLoading } = useGetAllUserWithdrawalsQuery(null)
        if (!isLoading) {
            dispatch(user_withdrawal_list(data))
        }
    }



    function GetAllUserDeposits() {
        const { data, isLoading } = useGetallUserDepositQuery(null)
        if (!isLoading) {
            dispatch(user_deposit_list(data))
        }
    }




    GetUserLastDepositAmount()
    GetUserPendingDeposits()
    GetUserTotalDepositAmount();
    GetUserAccountBalance()
    GetUserLastWithdraw()
    GetUserPendingWithdrawTotal()
    GetWithdrawalTotal()
    GetAllUserWithdrawals()
    GetAllUserDeposits()
}


export default useGetUserTransactions