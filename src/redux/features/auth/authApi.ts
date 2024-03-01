import { baseApi } from "../api/apiSlice";

// import { apiSlice } from "../api/apiSlice";
import { setCredentials, userLoggedOut } from "./authSlice";


type RegistrationResponse = {
  message: string;
  activationToken: string;
};

type RegistrationData = {};
export const authApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<string,RegistrationData>({
      query: (credentials) => ({
        url: "/auth",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(userLoggedOut());
          setTimeout(() => {
            dispatch(baseApi.util.resetApiState());
          }, 1000);
        } catch (err) {
          console.log(err);
        }
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          const { accessToken,refreshToken } = data;
          dispatch(setCredentials({ accessToken , refreshToken }))
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const {  } =
  authApiSlice;
