import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api/"
    : "/api/";
const userTransactionAPI = createApi({
  reducerPath: "transactionAPI",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://node-backend-bitbyvest.onrender.com/api/"
    baseUrl: baseURL,
  }),
  tagTypes: ["transactionAPI"],
  endpoints: (builder) => ({
    createNewDeposit: builder.mutation({
      query: (body) => ({
        url: "user-section/create-new-deposit",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: body,
        credentials: "include",
      }),
      invalidatesTags: ["transactionAPI"],
    }),
    createNewWithdrawal: builder.mutation({
      query: (body) => ({
        url: "user-section/create-withdrawal",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: body,
        credentials: "include",
      }),
      invalidatesTags: ["transactionAPI"],
    }),
    getUserLastDepositAmount: builder.query({
      query: () => ({
        url: "user-section/user-last-deposit-amount",
        credentials: "include",
      }),
      providesTags: ["transactionAPI"],
    }),
    getUserPendingDepositAmount: builder.query({
      query: () => ({
        url: "user-section/user-pending-deposit-total",
        credentials: "include",
      }),
      providesTags: ["transactionAPI"],
    }),
    getUserTotalDepositAmount: builder.query({
      query: () => ({
        url: "user-section/user-total-deposit-amount",
        credentials: "include",
      }),
      providesTags: ["transactionAPI"],
    }),
    getUserAccountBalance: builder.query({
      query: () => ({
        url: "user-section/user-account-balance",
        credentials: "include",
      }),
      providesTags: ["transactionAPI"],
    }),
    getUserLastWithdrawAmount: builder.query({
      query: () => ({
        url: "user-section/user-last-withdrawal-amount",
        credentials: "include",
      }),
      providesTags: ["transactionAPI"],
    }),
    getUserPendingWithdrawAmount: builder.query({
      query: () => ({
        url: "user-section/withdrawal-processing-total",
        credentials: "include",
      }),
      providesTags: ["transactionAPI"],
    }),
    getUserWithdrawTotalAmount: builder.query({
      query: () => ({
        url: "user-section/user-total-withdrawal-amount",
        credentials: "include",
      }),
      providesTags: ["transactionAPI"],
    }),
    getallUserDeposit: builder.query({
      query: () => ({
        url: "user-section/all-deposits",
        credentials: "include",
      }),
      providesTags: ["transactionAPI"],
    }),
    getAllUserWithdrawals: builder.query({
      query: () => ({
        url: "user-section/all-withdrawals",
        credentials: "include",
      }),
      providesTags: ["transactionAPI"],
    }),
    // getAllUserPendingWithdrawals: builder.query({
    //     query: () => ({
    //         url: "user-section/pending-withdrawals",
    //         credentials: "include",
    //     }),
    //     providesTags: ["transactionAPI"]
    // }),
  }),
});

export const {
  useCreateNewDepositMutation,
  useGetUserLastDepositAmountQuery,
  useGetUserPendingDepositAmountQuery,
  useGetUserTotalDepositAmountQuery,
  useGetUserAccountBalanceQuery,
  useGetUserLastWithdrawAmountQuery,
  useGetUserPendingWithdrawAmountQuery,
  useGetUserWithdrawTotalAmountQuery,
  useGetAllUserWithdrawalsQuery,
  useGetallUserDepositQuery,
  useCreateNewWithdrawalMutation,
} = userTransactionAPI;
export default userTransactionAPI;
