import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  wishlistItems: [],
  amount: 0,
  total: 0,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    clearWishlist: (state) => {
      state.wishlistItems = [];
    },
    removeItem: (state, action) => {},
    increase: (state, { payload }) => {},
    decrease: (state, { payload }) => {},
  },
});

export const { clearWishlist, removeItem, increase, decrease } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
