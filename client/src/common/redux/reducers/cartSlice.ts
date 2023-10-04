import { createSlice } from "@reduxjs/toolkit";
import { CartItem } from "@/common/types/cartItem";

const initialState = {
  cartItems: [] as CartItem[],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: () => initialState,
    addItem: (state, action) => {
      const newItem: CartItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );
      if (existingItem) {
        existingItem.quantity = action.payload.quantity;
      } else {
        state.cartItems.push({ ...newItem });
      }
      state.total = newItem.quantity * newItem.price;
    },
    increase: (state, action) => {
      const itemToIncrease = state.cartItems.find(
        (item) => item.order_item === action.payload
      );
      if (itemToIncrease) {
        itemToIncrease.quantity++;
        state.total += itemToIncrease.price;
      }
    },
    decrease: (state, action) => {
      const itemToDecrease = state.cartItems.find(
        (item) => item.order_item === action.payload
      );
      if (itemToDecrease) {
        if (itemToDecrease.quantity === 1) {
          state.total -= itemToDecrease.price;
          state.cartItems = state.cartItems.filter(
            (item) => item.order_item !== action.payload
          );
        } else {
          itemToDecrease.quantity--;
          state.total -= itemToDecrease.price;
        }
      }
    },
  },
});

export const { clearCart, addItem, increase, decrease } = cartSlice.actions;
export default cartSlice.reducer;
