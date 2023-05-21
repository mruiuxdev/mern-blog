import { configureStore } from "@reduxjs/toolkit";
import userReducers from "./slices/users/usersSlices";
import categoriesReducers from "./slices/categories/categoriesSlides";

const store = configureStore({
	reducer: {
		user: userReducers,
		categories: categoriesReducers,
	},
});

export default store;
