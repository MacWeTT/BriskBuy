import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Credentials } from "@/common/types/user";

const BASEURL = process.env.NEXT_PUBLIC_BACKEND_URL!;

export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASEURL}/api/users/auth/`,
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials: Credentials) => ({
        url: "login/",
        method: "POST",
        body: credentials,
      }),
    }),
    registerUser: builder.mutation({
      query(data: any) {
        return {
          url: "register/",
          method: "POST",
          body: data,
        };
      },
    }),
    logoutUser: builder.mutation<void, void>({
      query() {
        return {
          url: "logout",
          credentials: "include",
        };
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useLogoutUserMutation,
} = authAPI;
