import { baseApi } from "../api/apiSlice";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userInfo: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // console.log(data);
          // dispatch(userLoggedIn({ user: data. }));
        } catch (error) {
          console.log("[USER_INFO_API_ERROR]:", error);
        }
      },
    }),
  }),
});

export const { useUserInfoQuery } = userApi;
