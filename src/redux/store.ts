import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import { baseApi } from "./features/api/apiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  devTools: true, // letter make it false
  middleware: (getDefaultMiddeware) =>
    getDefaultMiddeware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
