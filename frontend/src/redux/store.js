import { configureStore } from "@reduxjs/toolkit";
import userReducers from "./slices/users/usersSlices";
import categoriesReducers from "./slices/categories/categoriesSlides";
import postsReducers from "./slices/posts/postsSlices";

const store = configureStore({
	reducer: {
		user: userReducers,
		categories: categoriesReducers,
		posts: postsReducers,
	},
});

export default store;
