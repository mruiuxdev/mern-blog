import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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

export const addPost = createAsyncThunk(
	"/post/add",
	async (post, { rejectWithValue, getState, dispatch }) => {
		const {
			user: {
				userAuth: { token },
			},
		} = getState();

		const { title, description } = post;

		try {
			const { data } = await axios.post(
				`${process.env.REACT_APP_URL_API}/post`,
				{ title, description },
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

const postsSlices = createSlice({
	name: "post",
	initialState: {},
	extraReducers: (builder) => {
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
	},
});

export default postsSlices.reducer;
