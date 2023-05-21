import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./index.scss";
import App from "./App";
import NotFound from "./components/not-found/NotFound";
import Register from "./components/auth/register/Register";
import Profile from "./components/profile/Profile";
import Login from "./components/auth/login/Login";
import Navbar from "./components/navigation/Navbar";
import AddNewCategory from "./components/categories/AddNewCategory";
import CategoryList from "./components/categories/CategoryList";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Provider store={store}>
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/add-category" element={<AddNewCategory />} />
				<Route path="/categories" element={<CategoryList />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	</Provider>
);
