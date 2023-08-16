import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null,
};

const userSlice = createSlice({
  name: "Guest",
  initialState,
  reducers: {
    setUser: (state, action) => {},
    setLoggedIn: (state, action) => {},
    setAccessToken: (state, action) => {},
    setRefreshToken: (state, action) => {},
  },
});

export default userSlice.reducer;
export const { setUser, setLoggedIn, setAccessToken, setRefreshToken } =
  userSlice.actions;
