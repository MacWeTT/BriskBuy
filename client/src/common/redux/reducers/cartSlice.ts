import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  cartItems: [],
  amount: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {},
    increase: (state, { payload }) => {},
    decrease: (state, { payload }) => {},
    calculateTotals: (state) => {},
  },
});

// console.log(cartSlice)
export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions;
export default cartSlice.reducer;
