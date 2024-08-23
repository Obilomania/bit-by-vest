import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api/"
    : "/api/";

const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    mode: "cors",
    redirect: "follow",
  }),
  tagTypes: ["authAPI"],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "authentication/registration",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: userData,
        credentials: "include",
      }),
      invalidatesTags: ["authAPI"],
    }),
    loginUser: builder.mutation({
      query: (userCredentials) => ({
        url: "authentication/login",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: userCredentials,
        credentials: "include",
      }),
      invalidatesTags: ["authAPI"],
    }),
    getUserProfile: builder.query({
      query: () => ({
        url: "authentication/viewmyprofile",
        credentials: "include",
      }),
      providesTags: ["authAPI"],
    }),
    editUserProfile: builder.mutation({
      query: ({ userInput }) => ({
        url: `authentication/editprofile`,
        method: "PUT",
        body: userInput,
        credentials: "include",
      }),
      invalidatesTags: ["authAPI"],
    }),
    userChangePassword: builder.mutation({
      query: ({ userInput }) => ({
        url: `authentication/changepassword`,
        method: "PUT",
        body: userInput,
        credentials: "include",
      }),
      invalidatesTags: ["authAPI"],
    }),
    userLogOut: builder.query({
      query: () => ({
        url: "authentication/viewmyprofile",
        credentials: "include",
      }),
      providesTags: ["authAPI"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetUserProfileQuery,
  useEditUserProfileMutation,
  useUserChangePasswordMutation,
  useUserLogOutQuery,
} = authAPI;
export default authAPI;
