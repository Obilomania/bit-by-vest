import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api/"
    : "/api/";
const adminAPI = createApi({
  reducerPath: "adminAPI",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:5000/api/",
    baseUrl: baseURL,
  }),
  tagTypes: ["adminAPI"],
  endpoints: (builder) => ({
    createPromoCode: builder.mutation({
      query: (promoData) => ({
        url: "admin-section/createpromocode",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: promoData,
        credentials: "include",
      }),
      invalidatesTags: ["adminAPI"],
    }),
    getAllPromoCodes: builder.query({
      query: () => ({
        url: "admin-section/allpromocodes",
        credentials: "include",
      }),
      providesTags: ["adminAPI"],
    }),
    deletePromoCode: builder.mutation({
      query: (_id) => ({
        url: "admin-section/admindeletepromocode/" + _id,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["adminAPI"],
    }),
    getAllApplicationUser: builder.query({
      query: () => ({
        url: "admin-section/admingetalluser",
        credentials: "include",
      }),
      providesTags: ["adminAPI"],
    }),
    blockUser: builder.mutation({
      query: (_id) => ({
        url: "admin-section/adminblockuser/" + _id,
        method: "PUT",
        credentials: "include",
      }),
      invalidatesTags: ["adminAPI"],
    }),
    unBlockUser: builder.mutation({
      query: (_id) => ({
        url: "admin-section/adminunblockuser/" + _id,
        method: "PUT",
        credentials: "include",
      }),
      invalidatesTags: ["adminAPI"],
    }),
    adminGetAllPendingDeposits: builder.query({
      query: () => ({
        url: "admin-section/deposit/pending-deposits",
        credentials: "include",
      }),
      providesTags: ["adminAPI"],
    }),
    adminAprroveDeposit: builder.mutation({
      query: (_id) => ({
        url: "admin-section/deposit/processing/" + _id,
        method: "PUT",
        credentials: "include",
      }),
      invalidatesTags: ["adminAPI"],
    }),
    adminGetAllApprovedDeposits: builder.query({
      query: () => ({
        url: "admin-section/deposit/approved-deposits",
        credentials: "include",
      }),
      providesTags: ["adminAPI"],
    }),
    adminGetAllPendingWithdrawal: builder.query({
      query: () => ({
        url: "admin-section/withdrawal/pending-withdrawals",
        credentials: "include",
      }),
      providesTags: ["adminAPI"],
    }),
    adminGetAllApprovedWithdrawal: builder.query({
      query: () => ({
        url: "admin-section/withdrawal/approved-withdrawals",
        credentials: "include",
      }),
      providesTags: ["adminAPI"],
    }),
    adminAprroveWithdrawal: builder.mutation({
      query: (_id) => ({
        url: "admin-section/withdrawal/processing/" + _id,
        method: "PUT",
        credentials: "include",
      }),
      invalidatesTags: ["adminAPI"],
    }),
  }),
});

export const {
  useCreatePromoCodeMutation,
  useGetAllPromoCodesQuery,
  useDeletePromoCodeMutation,
  useGetAllApplicationUserQuery,
  useBlockUserMutation,
  useUnBlockUserMutation,
  useAdminGetAllPendingDepositsQuery,
  useAdminAprroveDepositMutation,
  useAdminGetAllApprovedDepositsQuery,
  useAdminGetAllPendingWithdrawalQuery,
  useAdminGetAllApprovedWithdrawalQuery,
  useAdminAprroveWithdrawalMutation,
} = adminAPI;
export default adminAPI;
