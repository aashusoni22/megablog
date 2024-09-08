import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [], // initial state for posts
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    clearPosts: (state) => {
      state.posts = [];
    },
  },
});

export const { setPosts, clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
