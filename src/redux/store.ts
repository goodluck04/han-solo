import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./features/auth/authSlice";
import { baseApi } from "./features/api/apiSlice";


export const store = configureStore({
  reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      auth: authReducer,
  },
  devTools: true, // letter make it false
  middleware: (getDefaultMiddeware) => getDefaultMiddeware().concat(baseApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
