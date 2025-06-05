import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    getAllUser: builder.query({
      query: () => {
        return {
          url: `/users/get-all-user`,
          method: "GET",
        };
      },
      providesTags: ["users"],
    }),
    getUserInfo: builder.query({
      query: (userId) => {
        return {
          url: `/users/user-info/${userId}`,
          method: "GET",
        };
      },
      providesTags: ["users"],
    }),
    updateUSerProfile: builder.mutation({
      query: ({ userData, userId }) => {
        return {
          url: `/users/update-profile/${userId}`,
          method: "PUT",
          body: userData,
        };
      },
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetMeQuery,
  useGetUserInfoQuery,
  useUpdateUSerProfileMutation,
  useGetAllUserQuery,
} = userApi;
