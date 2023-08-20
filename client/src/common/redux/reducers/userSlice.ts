import { createSlice } from "@reduxjs/toolkit";
import { User, UserState } from "@/common/types/user";

//Guest User
const GuestUser: User = {
  pk: 0,
  username: "Guest",
  email: "guest@localhost",
  first_name: "Guest",
  last_name: "User",
};

const initialState: UserState = {
  user: GuestUser,
  access_token: "",
  refresh_token: "",
  isLoggedIn: false,
};

const userSlice = createSlice({
  initialState,
  name: "userSlice",
  reducers: {
    setUser: (state, action) => {
      state.access_token = action.payload.access;
      state.refresh_token = action.payload.refresh;
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },
    logout: () => initialState,
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
