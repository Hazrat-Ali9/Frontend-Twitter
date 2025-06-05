import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  // Base Api
   baseUrl: "http://localhost:5000/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set(`authorization`, `${token}`);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: ["users", "posts", "likes", "comments", "follow"],
  endpoints: () => ({}),
});
