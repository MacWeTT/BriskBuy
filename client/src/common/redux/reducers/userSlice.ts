import { createSlice } from "@reduxjs/toolkit";
import { User, UserState, JWT, ShippingAddress } from "@/common/types/user";
import jwtDecode from "jwt-decode";

//Guest User
const GuestUser: User = {
  pk: 0,
  username: "Guest",
  email: "guest@localhost",
  name: "Guest",
  verified: false,
};
const GuestShippingAddress: ShippingAddress = {
  id: 0,
  street_address: "",
  city: "",
  state: "",
  postal_code: "",
};

const initialState: UserState = {
  user: GuestUser,
  shipping_address: GuestShippingAddress,
  access_token: "",
  refresh_token: "",
  isLoggedIn: false,
};

const userSlice = createSlice({
  initialState,
  name: "userSlice",
  reducers: {
    setUser: (state, action) => {
      const decoded: JWT = jwtDecode(action.payload.access);
      state.user = {
        pk: decoded.user_id,
        username: decoded.username,
        email: decoded.email,
        name: decoded.name,
        verified: decoded.verified,
      };
      state.access_token = action.payload.access;
      state.refresh_token = action.payload.refresh;
      state.isLoggedIn = true;
    },
    logout: () => initialState,
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
