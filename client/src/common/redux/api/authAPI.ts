import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  LoginCredentials,
  RegisterCredentials,
  ChangePasswordCredentials,
  UserState,
} from "@/common/types/user";
import { RootState } from "@/common/redux/store";

const BASEURL = process.env.NEXT_PUBLIC_BACKEND_URL!;

export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.access_token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
    baseUrl: `${BASEURL}/users/`,
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials: LoginCredentials) => ({
        url: "login/",
        method: "POST",
        body: credentials,
      }),
    }),
    registerUser: builder.mutation({
      query(credentials: RegisterCredentials) {
        return {
          url: "register/",
          method: "POST",
          body: credentials,
        };
      },
    }),
    refreshUser: builder.mutation({
      query(refresh: string) {
        return {
          url: "token/refresh/",
          method: "POST",
          body: refresh,
        };
      },
    }),
    editUserProfile: builder.mutation({
      query: (user: UserState) => ({
        url: "profile/",
        method: "PUT",
        body: user,
      }),
    }),
    changePassword: builder.mutation({
      query: (passwords: ChangePasswordCredentials) => ({
        url: "change-password/",
        method: "PATCH",
        body: passwords,
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useRefreshUserMutation,
  useEditUserProfileMutation,
  useChangePasswordMutation,
} = authAPI;
