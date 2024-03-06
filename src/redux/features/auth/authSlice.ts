import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action: PayloadAction<{ user: string }>) => {
      state.user = action.payload.user;
    },
    setCredentials: (state, action: PayloadAction<{ accessToken: string }>) => {
      state.token = action.payload.accessToken;
    },
    userLoggedOut: (state) => {
      state.token = "";
      state.user = "";
    },
  },
});

export const { setCredentials, userLoggedIn, userLoggedOut } =
  authSlice.actions;

export default authSlice.reducer;
