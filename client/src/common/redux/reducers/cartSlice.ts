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
    addItem: (state, action) => {
      const newItem: CartItem = action.payload;
      console.log(newItem);
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );
      if (existingItem) existingItem.quantity += 1;
      else state.cartItems.push({ ...newItem, quantity: 1 });

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
    refreshCart: (state, action) => {
      if (!action.payload) initialState;
      else {
        state.cartItems = action.payload.cartItems;
        state.total = action.payload.total;
      }
    },
    clearCart: () => initialState,
  },
});

export const { addItem, increase, decrease, refreshCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
