import { createSlice } from "@reduxjs/toolkit";

import { Product } from "@/common/types/product";

const initialState = {
  wishlistItems: [] as Product[],
  total: 0,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    clearWishlist: () => initialState,
    addItemToWishlist: (state, action) => {
      const newItem: Product = action.payload;
      const existingItem = state.wishlistItems.find(
        (item) => item.id === newItem.id
      );
      if (!existingItem) {
        state.wishlistItems.push(newItem);
      }
    },
    removeItemFromWishlist: (state, action) => {
      const itemToRemove = state.wishlistItems.find(
        (item) => item.id === action.payload
      );
      if (itemToRemove) {
        state.wishlistItems = state.wishlistItems.filter(
          (item) => item.id !== action.payload
        );
      }
    },
  },
});

export const { clearWishlist, removeItemFromWishlist, addItemToWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
