import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    promoCodes: null,
    allApplicationUsers: null,
    selectedUserToViewID: "",
    pendingDeposits: null,
    approvedDeposits: null,
    pendingWithdrawal: null,
    approvedWithdrawals:null
}

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        all_promo_codes: (state, action) => {
            state.promoCodes = action.payload;
        },
        all_app_application_users: (state, action) => {
            state.allApplicationUsers = action.payload;
        },
        view_selected_user_ID: (state, action) => {
            state.selectedUserToViewID = action.payload
        },
        admin_all_pending_deposit: (state, action) => {
            state.pendingDeposits = action.payload
        },
        admin_all_approved_deposit: (state, action) => {
            state.approvedDeposits = action.payload
        },
        admin_all_pending_withdrawals: (state, action) => {
            state.pendingWithdrawal = action.payload
        },
        admin_all_approved_withdrawals: (state, action) => {
            state.approvedWithdrawals = action.payload
        },
        resetPromoCodes: (state) => {
            state.promoCodes = null;
            state.allApplicationUsers = null;
            state.selectedUserToViewID = "";
            state.pendingDeposits = null;
            state.approvedDeposits = null;
            state.pendingWithdrawal = null;
            state.approvedWithdrawals = null
        }
    }
});

export const { resetPromoCodes, all_promo_codes, all_app_application_users, view_selected_user_ID, admin_all_pending_deposit, admin_all_approved_deposit, admin_all_pending_withdrawals, admin_all_approved_withdrawals } = adminSlice.actions

export const adminReducer = adminSlice.reducer