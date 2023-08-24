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
        existingItem.quantity++;
      } else {
        state.cartItems.push({ ...newItem, quantity: 1 });
      }
      state.total += newItem.price as number;
    },
    removeItem: (state, action) => {
      const itemToRemove = state.cartItems.find(
        (item) => item.id === action.payload
      );
      if (itemToRemove) {
        state.total -= itemToRemove.price * itemToRemove.quantity;
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload
        );
      }
    },
    increase: (state, action) => {
      const itemToIncrease = state.cartItems.find(
        (item) => item.id === action.payload
      );
      if (itemToIncrease) {
        itemToIncrease.quantity++;
        state.total += itemToIncrease.price;
      }
    },
    decrease: (state, action) => {
      const itemToDecrease = state.cartItems.find(
        (item) => item.id === action.payload
      );
      if (itemToDecrease) {
        if (itemToDecrease.quantity === 1) {
          state.total -= itemToDecrease.price;
          state.cartItems = state.cartItems.filter(
            (item) => item.id !== action.payload
          );
        } else {
          itemToDecrease.quantity--;
          state.total -= itemToDecrease.price;
        }
      }
    },
  },
});

export const { clearCart, addItem, removeItem, increase, decrease } =
  cartSlice.actions;
export default cartSlice.reducer;
