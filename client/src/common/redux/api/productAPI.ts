import { createApi } from "@reduxjs/toolkit/query/react";
import reAuthEcommerceBaseQuery from "./reAuthBaseQuery/reAuthEcommerceBaseQuery";
import { addToCartDTO } from "@/common/types/orders";

export const productAPI = createApi({
  reducerPath: "productAPI",
  baseQuery: reAuthEcommerceBaseQuery,
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: (body: addToCartDTO) => ({
        url: "api/cart/",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const { useAddToCartMutation } = productAPI;
