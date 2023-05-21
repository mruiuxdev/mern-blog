import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const addCategory = createAsyncThunk(
  "/category",
  async (category, { rejectWithValue, getState, dispatch }) => {
    const {
      user: {
        userAuth: { token },
      },
    } = getState();

    const notifySuccess = () =>
      toast.success("New category added successfully", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    const notifyFailed = () =>
      toast.error("Something went wrong, try again", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_URL_API}/category`,
        { title: category?.title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      notifySuccess();

      return data;
    } catch (err) {
      if (!err?.response) throw err;

      notifyFailed();

      return rejectWithValue(err?.response?.data);
    }
  }
);

export const categories = createAsyncThunk(
  "/categories",
  async (categories, { rejectWithValue, getState, dispatch }) => {
    const {
      user: {
        userAuth: { token },
      },
    } = getState();

    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL_API}/categories`,
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

export const category = createAsyncThunk(
  "category/details",
  async (id, { rejectWithValue, getState, dispatch }) => {
    const {
      user: {
        userAuth: { token },
      },
    } = getState();

    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL_API}/category/${id}`,
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

export const updateCategory = createAsyncThunk(
  "category/update",
  async (id, { rejectWithValue, getState, dispatch }) => {
    const {
      user: {
        userAuth: { token },
      },
    } = getState();

    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_URL_API}/category/${id}`,
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

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (id, { rejectWithValue, getState, dispatch }) => {
    const {
      user: {
        userAuth: { token },
      },
    } = getState();

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_URL_API}/category/${id}`,
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

const categoriesSlices = createSlice({
  name: "category",
  initialState: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.category = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });

    builder
      .addCase(categories.pending, (state) => {
        state.loading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(categories.fulfilled, (state, action) => {
        state.categoryList = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(categories.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });

    builder
      .addCase(category.pending, (state) => {
        state.loading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(category.fulfilled, (state, action) => {
        state.category = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(category.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });

    builder
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.categoryUpdated = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });

    builder
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categoryDeleted = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });
  },
});

export default categoriesSlices.reducer;
