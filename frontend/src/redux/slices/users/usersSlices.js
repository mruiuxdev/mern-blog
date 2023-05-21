import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const register = createAsyncThunk(
	"/register",
	async (user, { rejectWithValue, getState, dispatch }) => {
		try {
			const { data } = await axios.post(
				`${process.env.REACT_APP_URL_API}/register`,
				user
			);

			localStorage.setItem("userInfo", JSON.stringify(data));

			return data;
		} catch (err) {
			if (!err?.response) throw err;

			return rejectWithValue(err?.response?.data);
		}
	}
);

export const login = createAsyncThunk(
	"/login",
	async (user, { rejectWithValue, getState, dispatch }) => {
		try {
			const { data } = await axios.post(
				`${process.env.REACT_APP_URL_API}/login`,
				user
			);

			localStorage.setItem("userInfo", JSON.stringify(data));

			return data;
		} catch (err) {
			if (!err?.response) throw err;

			return rejectWithValue(err?.response?.data);
		}
	}
);

export const logout = createAsyncThunk(
	"/logout",
	async (payload, { rejectWithValue, getState, dispatch }) => {
		try {
			localStorage.removeItem("userInfo");
		} catch (err) {
			if (!err?.response) throw err;

			return rejectWithValue(err?.response?.data);
		}
	}
);

const userLoginFromLocalStorage = localStorage.getItem("userInfo")
	? JSON.parse(localStorage.getItem("userInfo"))
	: null;

const userSlices = createSlice({
	name: "user",
	initialState: {
		userAuth: userLoginFromLocalStorage,
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.loading = true;
				state.appErr = undefined;
				state.serverErr = undefined;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.loading = false;
				state.registered = action?.payload;
				state.appErr = undefined;
				state.serverErr = undefined;
				state.userAuth = action?.payload;
			})
			.addCase(register.rejected, (state, action) => {
				state.loading = false;
				state.appErr = action?.payload?.message;
				state.serverErr = action?.error?.message;
			});

		builder
			.addCase(login.pending, (state) => {
				state.loading = true;
				state.appErr = undefined;
				state.appServer = undefined;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.loading = false;
				state.logged = action?.payload;
				state.appErr = undefined;
				state.appServer = undefined;
				state.userAuth = action?.payload;
			})
			.addCase(login.rejected, (state, action) => {
				state.loading = false;
				state.appErr = action?.payload?.message;
				state.serverErr = action?.error?.message;
			});

		builder
			.addCase(logout.pending, (state) => {
				state.loading = true;
			})
			.addCase(logout.fulfilled, (state, action) => {
				state.loading = false;
				state.logged = undefined;
				state.registered = undefined;
				state.userAuth = undefined;
				state.appErr = undefined;
				state.appServer = undefined;
			})
			.addCase(logout.rejected, (state, action) => {
				state.loading = true;
				state.appErr = action?.payload?.message;
				state.serverErr = action?.error?.message;
			});
	},
});

export default userSlices.reducer;
