import { createApi } from "@reduxjs/toolkit/query/react";
import reAuthBaseQuery from "./reAuthBaseQuery/reAuthUserBaseQuery";
import {
  LoginCredentials,
  RegisterCredentials,
  ChangePasswordCredentials,
  UserState,
  User,
} from "@/common/types/user";

export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: reAuthBaseQuery,
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
    editUserProfile: builder.mutation({
      query: (user: User) => ({
        url: "edit-profile/",
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
  useEditUserProfileMutation,
  useChangePasswordMutation,
} = authAPI;
