import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { userAuthReducer } from "./authentication/authSlice";
import authAPI from "../APIs/authAPI";
import userTransactionAPI from "../APIs/userTransactionsAPI";
import { userTransactionReducer } from "./usertransaction/userTransactionSlice";
import { adminReducer } from "./admin/adminSlice";
import adminAPI from "../APIs/adminAPI";



const persistConfig = {
    key: 'root',
    storage,
}

const reducer = combineReducers({
    auth: userAuthReducer,
    transaction: userTransactionReducer,
    admin: adminReducer
})

const persistedReducer = persistReducer(persistConfig, reducer);


const store = configureStore({
    reducer: {
        persistedReducer,
        [authAPI.reducerPath]: authAPI.reducer,
        [userTransactionAPI.reducerPath]: userTransactionAPI.reducer,
        [adminAPI.reducerPath]: adminAPI.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false })
            .concat(authAPI.middleware)
            .concat(userTransactionAPI.middleware)
            .concat(adminAPI.middleware)
})


export type RootState = ReturnType<typeof store.getState>;
export default store