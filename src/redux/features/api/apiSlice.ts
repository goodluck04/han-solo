import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query";
import { setCredentials, userLoggedOut } from "../auth/authSlice";
import { RootState } from "@/redux/store";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.BASE_URL!,
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
  // Define the structure of your refresh token response
  accessToken: string;
  refreshToken: string;
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
        url: "token/refresh/",
        method: "POST",
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      console.log(refreshResult.data);
      // api.dispatch(setCredentials({ accessToken,refreshToken }));

      const { accessToken, refreshToken } = refreshResult.data as RefreshTokenResponse;

      api.dispatch(setCredentials({ accessToken, refreshToken }));

      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(userLoggedOut());
      // if (refreshResult?.error?.status === 403) {
      //   refreshResult.error.data.message = 'Your login has expired.';
      // }
    //   return refreshResult;
    // }
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
