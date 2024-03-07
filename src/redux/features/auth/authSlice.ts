import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  temp_token: "",
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTempToken: (state, action: PayloadAction<{ temp_token: string }>) => {
      state.temp_token = action.payload.temp_token;
    },
    resetTempToken: (state) => {
      state.temp_token = "";
    },
    setCredentials: (state, action: PayloadAction<{ accessToken: string }>) => {
      state.token = action.payload.accessToken;
    },
    userLoggedOut: (state) => {
      state.token = "";
    },
  },
});

export const { setCredentials, userLoggedOut, setTempToken, resetTempToken } =
  authSlice.actions;

export default authSlice.reducer;
