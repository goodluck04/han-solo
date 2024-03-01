import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: "",
  refreshToken: "",
  user: "",
  token:""
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action: PayloadAction<{ user: string }>) => {
      state.user = action.payload.user;
    },
    setCredentials: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    userLoggedOut: (state) => {
      state.accessToken = "";
      state.refreshToken = "";
      state.user = "";
    },
  },
});

export const { setCredentials, userLoggedIn, userLoggedOut } =
  authSlice.actions;

export default authSlice.reducer;
