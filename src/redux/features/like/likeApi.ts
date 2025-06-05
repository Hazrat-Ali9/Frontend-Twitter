import { baseApi } from "../../api/baseApi";

const likeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createLike: builder.mutation({
      query: (likeData) => ({
        url: "likes/create-like",
        method: "POST",
        body: likeData,
      }),
      invalidatesTags: ["likes"],
    }),
    removeLike: builder.mutation({
      query: (likeData) => ({
        url: `likes/remove-like/${likeData.postId}/${likeData.userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["likes"],
    }),
    totalLikes: builder.query({
      query: (postId: string) => {
        return {
          url: `likes/get-all-likes/${postId}`,
          method: "GET",
        };
      },
      providesTags: ["likes"],
    }),
    checkPostLike: builder.query({
      query: (userId: string) => {
        return {
          url: `likes/check-liked/${userId}`,
          method: "GET",
        };
      },
      providesTags: ["likes"],
    }),
  }),
});

export const {
  useCreateLikeMutation,
  useRemoveLikeMutation,
  useTotalLikesQuery,
  useCheckPostLikeQuery,
} = likeApi;
