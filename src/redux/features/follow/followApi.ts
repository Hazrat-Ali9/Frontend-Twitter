import { baseApi } from "../../api/baseApi";

const followApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFollowing: builder.query({
      query: (followingId: string) => ({
        url: `/follows/get-following/${followingId}`,
        method: "GET",
      }),
      providesTags: ["follow"],
    }),
    getAllFollower: builder.query({
      query: (followingId: string) => ({
        url: `/follows/get-follower/${followingId}`,
        method: "GET",
      }),
      providesTags: ["follow"],
    }),
    createFollow: builder.mutation({
      query: (followData) => ({
        url: "/follows/create-follow",
        method: "POST",
        body: followData,
      }),
      invalidatesTags: ["follow"],
    }),
    removeFollow: builder.mutation({
      query: (followData) => {
        return {
          url: `follows/remove-follow/${followData.followingUserId}/${followData.followerUserId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["follow"],
    }),
    checkFollow: builder.query({
      query: (followingUserId: string) => {
        return {
          url: `/follows/check-follow/${followingUserId}`,
          method: "GET",
        };
      },
      providesTags: ["follow"],
    }),
  }),
});

export const {
  useCreateFollowMutation,
  useCheckFollowQuery,
  useRemoveFollowMutation,
  useGetAllFollowingQuery,
  useGetAllFollowerQuery,
} = followApi;
