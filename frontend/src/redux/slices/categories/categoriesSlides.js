import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const notifySuccess = (msg = "New category added successfully") =>
  toast.success(msg, {
    position: toast.POSITION.BOTTOM_LEFT,
  });
const notifyFailed = (msg = "Something went wrong, try again") =>
  toast.error(msg, {
    position: toast.POSITION.BOTTOM_LEFT,
  });

const isCategoryAddedAction = createAction("/category/isAdded");

export const addCategory = createAsyncThunk(
  "/category",
  async (category, { rejectWithValue, getState, dispatch }) => {
    const {
      user: {
        userAuth: { token },
      },
    } = getState();

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

      dispatch(isCategoryAddedAction());

      return data;
    } catch (err) {
      if (!err?.response) throw err;

      notifyFailed();

      return rejectWithValue(err?.response?.data);
    }
  }
);

export const getCategories = createAsyncThunk(
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

export const getCategory = createAsyncThunk(
  "category/details",
  async (categoryId, { rejectWithValue, getState, dispatch }) => {
    const {
      user: {
        userAuth: { token },
      },
    } = getState();

    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL_API}/category/${categoryId}`,
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

const isCategoryUpdatedAction = createAction("/category/isUpdated");

export const updateCategory = createAsyncThunk(
  "category/update",
  async (category, { rejectWithValue, getState, dispatch }) => {
    const {
      user: {
        userAuth: { token },
      },
    } = getState();

    const { categoryId, title } = category;

    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_URL_API}/category/${categoryId}`,
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(isCategoryUpdatedAction());

      notifySuccess("Category updated successfully");

      return data;
    } catch (err) {
      if (!err?.response) throw err;

      notifyFailed();

      return rejectWithValue(err?.response?.data);
    }
  }
);

const isCategoryDeletedAction = createAction("/category/isDeleted");

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (category, { rejectWithValue, getState, dispatch }) => {
    const {
      user: {
        userAuth: { token },
      },
    } = getState();

    const { categoryId } = category;
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_URL_API}/category/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(isCategoryDeletedAction());

      notifySuccess("Category deleted successfully");

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
    builder.addCase(isCategoryAddedAction, (state) => {
      state.isAdded = true;
    });

    builder
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.category = action?.payload;
        state.loading = false;
        state.isAdded = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });

    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categoryList = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });

    builder
      .addCase(getCategory.pending, (state) => {
        state.loading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.category = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });

    builder.addCase(isCategoryUpdatedAction, (state) => {
      state.isEdited = true;
    });

    builder
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.categoryUpdated = action?.payload;
        state.isEdited = false;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });

    builder.addCase(isCategoryDeletedAction, (state) => {
      state.isDeleted = true;
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
        state.isDeleted = true;
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
