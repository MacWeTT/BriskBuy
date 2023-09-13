import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  LoginCredentials,
  RegisterCredentials,
  UserState,
} from "@/common/types/user";

const BASEURL = process.env.NEXT_PUBLIC_BACKEND_URL!;

export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as UserState).access_token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
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
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useRefreshUserMutation,
} = authAPI;
