import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store";
import { refreshUser, logout } from "../../reducers/userSlice";

const BASEURL = process.env.NEXT_PUBLIC_BACKEND_URL!;

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASEURL}/`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user.access_token;
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

const EcommerceBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status == 401) {
    try {
      const refreshResult = await baseQuery(
        {
          credentials: "include",
          url: "users/login/refresh/",
          method: "POST",
          body: { refresh: (api.getState() as RootState).user.refresh_token },
        },
        api,
        extraOptions
      );
      api.dispatch(refreshUser(refreshResult.data));
      if (refreshResult.data) {
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
        window.location.href = "/auth/login";
      }
    } catch (error) {
      console.error(error);
    }
  }
  return result;
};

export default EcommerceBaseQuery;
