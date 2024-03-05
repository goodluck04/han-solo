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
      query: ({ email, phone, password }) => ({
        url: "/auth/register",
        method: "POST",
        body: { email, phone, password },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(setCredentials({ accessToken: data.activationToken }));
        } catch (error) {
          console.log("[REGISTER_API_ERROR]:", error);
        }
      },
    }),
    verification: builder.mutation({
      query: ({ activation_code, activation_token }) => ({
        url: "/auth/activation",
        method: "POST",
        body: { activation_code, activation_token },
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
        } catch (error) {
          console.log("[LOGOUT_API_ERROR]:", error);
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
        } catch (error) {
          console.log("[REFRESH_TOKEN_API_ERROR]:", error);
        }
      },
    }),
    forgotPassword: builder.mutation({
      query: ({ email }) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: { email },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(setCredentials({ accessToken: data.activationToken }));
        } catch (error) {
          console.log("[FORGOT_PASSWORD_API_ERROR]:", error);
        }
      },
    }),
    changePassword: builder.mutation({
      query: ({ activation_token, activation_code, newPassword }) => ({
        url: "/auth/change-password",
        method: "POST",
        body: { activation_code, activation_token, newPassword },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useVerificationMutation,
  useForgotPasswordMutation,
  useChangePasswordMutation,
} = authApi;
