import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
    credentials: "include" as const,
  }),
  endpoints: (builder) => ({}),
});

export const {} = apiSlice;
