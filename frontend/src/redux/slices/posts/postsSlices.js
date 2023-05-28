import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const notifySuccess = (msg = "New post added successfully") =>
  toast.success(msg, {
    position: toast.POSITION.BOTTOM_LEFT,
  });
const notifyFailed = (msg = "Something went wrong, try again") =>
  toast.error(msg, {
    position: toast.POSITION.BOTTOM_LEFT,
  });

const isAdded = createAction("/post/isAdded");

export const addPost = createAsyncThunk(
  "/post/add",
  async (post, { rejectWithValue, getState, dispatch }) => {
    const {
      user: {
        userAuth: { token },
      },
    } = getState();

    const formData = new FormData();

    formData.append("title", post?.title);
    formData.append("category", post?.category);
    formData.append("description", post?.description);
    formData.append("image", post?.image);

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_URL_API}/post`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      notifySuccess();

      dispatch(isAdded());

      return data;
    } catch (err) {
      if (!err?.response) throw err;

      notifyFailed();

      return rejectWithValue(err?.response?.data);
    }
  }
);

export const getPosts = createAsyncThunk(
  "/posts",
  async (category, { rejectWithValue, getState, dispatch }) => {
    const {
      user: {
        userAuth: { token },
      },
    } = getState();

    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL_API}/posts/?category=${category}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    } catch (err) {
      if (!err?.response) throw err;

      return rejectWithValue(err?.response?.data);
    }
  }
);

export const toggleLikePost = createAsyncThunk(
  "/post/like",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    const {
      user: {
        userAuth: { token },
      },
    } = getState();

    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_URL_API}/post/like/${postId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    } catch (err) {
      if (!err?.response) throw err;

      return rejectWithValue(err?.response?.data);
    }
  }
);

export const toggleDislikePost = createAsyncThunk(
  "/post/dislike",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    const {
      user: {
        userAuth: { token },
      },
    } = getState();

    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_URL_API}/post/dislike/${postId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    } catch (err) {
      if (!err?.response) throw err;

      return rejectWithValue(err?.response?.data);
    }
  }
);

const postsSlices = createSlice({
  name: "post",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(isAdded, (state) => {
      state.isAdded = true;
    });

    builder
      .addCase(addPost.pending, (state) => {
        state.loading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.post = action?.payload;
        state.loading = false;
        state.isAdded = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(addPost.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });

    builder
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.posts = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });

    builder
      .addCase(toggleLikePost.pending, (state) => {
        state.loading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(toggleLikePost.fulfilled, (state, action) => {
        state.likes = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(toggleLikePost.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });

    builder
      .addCase(toggleDislikePost.pending, (state) => {
        state.loading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(toggleDislikePost.fulfilled, (state, action) => {
        state.dislikes = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(toggleDislikePost.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });
  },
});

export default postsSlices.reducer;
