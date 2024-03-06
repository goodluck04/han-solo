// import {
//   BaseQueryFn,
//   FetchArgs,
//   FetchBaseQueryError,
// } from "@reduxjs/toolkit/query";
// import { setCredentials, userLoggedOut } from "../auth/authSlice";
// import { RootState } from "@/redux/store";

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { userLoggedIn } from "../auth/authSlice";

// const baseQuery = fetchBaseQuery({
//   baseUrl: process.env.NEXT_PUBLIC_URL!,
//   credentials: "include",
//   prepareHeaders: (headers, { getState }) => {
//     const token = (getState() as RootState).auth.token;

//     if (token) {
//       headers.set("authorization", `Bearer ${token}`);
//     }
//     return headers;
//   },
// });

// interface RefreshTokenResponse {
//   // Define the structure of your refresh token response
//   accessToken: string;
//   refreshToken: string;
// }

// const baseQueryWithReauth: BaseQueryFn<
//   string | FetchArgs,
//   unknown,
//   FetchBaseQueryError
// > = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);

//   if (result.error && result.error.status === 401) {
//     const refreshResult = await baseQuery(
//       {
//         url: "/auth/refresh",
//         method: "GET",
//       },
//       api,
//       extraOptions
//     );

//     if (refreshResult.data) {
//       console.log(refreshResult.data);
//       // api.dispatch(setCredentials({ accessToken,refreshToken }));

//       const { accessToken, refreshToken } =
//         refreshResult.data as RefreshTokenResponse;

//       api.dispatch(setCredentials({ accessToken }));

//       // retry the initial query
//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       api.dispatch(userLoggedOut());
//       // if (refreshResult?.error?.status === 403) {
//       //   refreshResult.error.data.message = 'Your login has expired.';
//       // }
//       //   return refreshResult;
//       // }
//     }
//   }
//   return result;
// };

// export const baseApi = createApi({
//   reducerPath: "api",
//   // baseQuery: fetchBaseQuery({
//   //     baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
//   // }),
//   baseQuery: baseQueryWithReauth,
//   endpoints: (builder) => ({}),
// });

// export const {} = baseApi;

import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { setCredentials, userLoggedOut } from "../auth/authSlice";
import { RootState } from "@/redux/store";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_URL!,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

interface RefreshTokenResponse {
  accessToken: string;
}

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh",
        method: "GET",
        credentials:"include"
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const { accessToken } = refreshResult.data as RefreshTokenResponse;

      api.dispatch(setCredentials({ accessToken }));

      // Retry the initial query after token refresh
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Token refresh failed, log out user
      api.dispatch(userLoggedOut());
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
