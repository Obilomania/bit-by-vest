import { createSlice } from '@reduxjs/toolkit'




const initialState = {
    fullname: "",
    id: "",
    email: "",
    isBlocked: false,
    btcWallet: "",
    role: "",
    isLoggedin: false,
    promoCode: ""
}

const authSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        current_user_fullname: (state, action) => {
            state.fullname = action.payload;
        },
        current_user_ID: (state, action) => {
            state.id = action.payload;
        },
        current_user_email: (state, action) => {
            state.email = action.payload;
        },
        current_user_btcWallet: (state, action) => {
            state.btcWallet = action.payload;
        },
        current_user_login_status: (state, action) => {
            state.isLoggedin = action.payload;
        },
        current_user_role: (state, action) => {
            state.role = action.payload;
        },
        current_user_promo_code: (state, action) => {
            state.promoCode = action.payload;
        },
        current_user_block_status: (state, action) => {
            state.isBlocked = action.payload;
        },
        resetUserState: (state) => {
            state.fullname = "";
            state.id = "";
            state.email = "";
            state.isBlocked = false;
            state.btcWallet = "";
            state.role = "";
            state.isLoggedin = false;
            state.promoCode = "";
        }
    }
});

export const { current_user_fullname,
    current_user_ID,
    current_user_email,
    current_user_btcWallet,
    current_user_login_status,
    current_user_role, current_user_promo_code,
    current_user_block_status,resetUserState } = authSlice.actions

export const userAuthReducer = authSlice.reducer