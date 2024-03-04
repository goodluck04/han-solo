import { baseApi } from "../api/apiSlice";

// import { apiSlice } from "../api/apiSlice";
import { setCredentials, userLoggedOut } from "./authSlice";

type RegistrationResponse = {
  data: {
    accessToken: string;
  };
};

type RegistrationRequest = {
  email: string;
  password: string;
  phone: string;
};
type LoginResponse = {
  data: {
    accessToken: string;
  };
};

type LoginRequest = {
  email: string;
  password: string;
};

type RegistrationData = {};
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: { ...credentials },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(setCredentials({ accessToken: data.activationToken }));
        } catch (err) {
          console.log("[LOGIN_SET_CREDENTIALS_ERROR]:", err);
        }
      },
    }),
    verification: builder.mutation({
      query: (credentials) => ({
        url: "/auth/activation",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    logout: builder.mutation({
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
          // console.log(data);
          const { accessToken } = data;
          dispatch(setCredentials({ accessToken }));
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useVerificationMutation,
} = authApi;
