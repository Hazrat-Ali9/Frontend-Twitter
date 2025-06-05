import { baseApi } from "../../api/baseApi";

const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allPost: builder.query({
      query: (searchTerm) => {
        const params = new URLSearchParams();
        if (searchTerm) {
          params.append("searchTerm", searchTerm);
        }
        return {
          url: "posts/get-all-posts",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["posts"],
    }),
    allPostByUserId: builder.query({
      query: (userId) => {
        return {
          url: `posts/get-all-posts-userId/${userId}`,
          method: "GET",
        };
      },
      providesTags: ["posts"],
    }),
    createPost: builder.mutation({
      query: (postData) => {
        return {
          url: "posts/create-post",
          method: "POST",
          body: postData,
        };
      },
      invalidatesTags: ["posts"],
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `posts/delete-post/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["posts"],
    }),
    updatePost: builder.mutation({
      query: ({ postId, postText }) => {
        return {
          url: `posts/update-post/${postId}`,
          method: "PUT",
          body: { postText },
        };
      },
      invalidatesTags: ["posts"],
    }),
  }),
});

export const {
  useAllPostQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useAllPostByUserIdQuery,
} = postApi;
