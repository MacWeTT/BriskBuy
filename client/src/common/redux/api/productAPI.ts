import { createApi } from "@reduxjs/toolkit/query/react";
import EcommerceBaseQuery from "./reAuth/EcommerceBaseQuery";
import { addToCartDTO, patchCartDTO } from "@/common/types/orders";
import { ShippingAddress } from "@/common/types/user";
import { CartItem } from "@/common/types/cartItem";
import { Product } from "@/common/types/product";

export const productAPI = createApi({
  reducerPath: "productAPI",
  baseQuery: EcommerceBaseQuery,
  endpoints: (builder) => ({
    getCart: builder.query<any, void>({
      query: () => "api/cart/",
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
    addToWishlist: builder.mutation({
      query: (body: Product) => ({
        url: "api/wishlist/",
        method: "POST",
        body: body,
      }),
    }),
    addShipping: builder.mutation({
      query: (body: ShippingAddress) => ({
        url: "api/shipping/",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const {
  //Cart Mutations
  useGetCartQuery,
  useAddToCartMutation,
  usePatchCartMutation,
  useDeleteCartMutation,
  //Shipping Address Mutations
  useAddToWishlistMutation,
  useAddShippingMutation,
} = productAPI;
