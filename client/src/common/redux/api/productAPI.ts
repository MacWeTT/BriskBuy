import { createApi } from "@reduxjs/toolkit/query/react";
import EcommerceBaseQuery from "./reAuth/EcommerceBaseQuery";
import { addToCartDTO, patchCartDTO } from "@/common/types/orders";

export const productAPI = createApi({
  reducerPath: "productAPI",
  baseQuery: EcommerceBaseQuery,
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => "api/cart/",
      transformResponse: (response: any) => response.data,
    }),
    addToCart: builder.mutation({
      query: (body: addToCartDTO) => ({
        url: "api/cart/",
        method: "POST",
        body: body,
      }),
    }),
    patchCart: builder.mutation({
      query: (body: patchCartDTO) => ({
        url: "api/cart/",
        method: "PATCH",
        body: body,
      }),
    }),
    deleteCart: builder.mutation({
      query: () => ({
        url: "api/cart/",
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetCartQuery, useAddToCartMutation } = productAPI;
