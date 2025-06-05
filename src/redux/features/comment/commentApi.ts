import { baseApi } from "../../api/baseApi";

const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllComment: builder.query({
      query: (postId: string) => ({
        url: `/comments/get-all-comment/${postId}`,
        method: "GET",
      }),
      providesTags: ["comments"],
    }),
    totalComments: builder.query({
      query: (postId: string) => {
        return {
          url: `comments/get-total-comment/${postId}`,
          method: "GET",
        };
      },
      providesTags: ["comments"],
    }),
    createComment: builder.mutation({
      query: (commentData) => ({
        url: "/comments/create-comment",
        method: "POST",
        body: commentData,
      }),
      invalidatesTags: ["comments"],
    }),
  }),
});

export const {
  useGetAllCommentQuery,
  useCreateCommentMutation,
  useTotalCommentsQuery,
} = commentApi;
