import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import NotFound from "./components/not-found/NotFound";
import Register from "./components/auth/register/Register";
import Profile from "./components/profile/Profile";
import Login from "./components/auth/login/Login";
import Navbar from "./components/navigation/Navbar";
import CategoryList from "./components/categories/CategoryList";
import AddCategory from "./components/categories/AddCategory";
import { ToastContainer } from "react-toastify";
import EditCategory from "./components/categories/EditCategory";
import PrivateProtectedRoute from "./components/navigation/protectedRoute/PrivateProtectedRoute";
import AdminProtectedRoute from "./components/navigation/protectedRoute/AdminProtectedRoute";
import NoAccess from "./components/no-access/NoAccess";
import AddPost from "./components/posts/AddPost";

function App() {
	return (
		<>
			<ToastContainer />
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/profile" element={<Profile />} />
					<Route element={<PrivateProtectedRoute />}>
						<Route path="/add-category" element={<AddCategory />} />
						<Route path="/add-post" element={<AddPost />} />
					</Route>
					<Route element={<AdminProtectedRoute />}>
						<Route
							path="/edit-category/:categoryId"
							element={<EditCategory />}
						/>
						<Route path="/categories" element={<CategoryList />} />
						<Route path="/add-post" element={<AddPost />} />
					</Route>
					<Route path="/no-access" element={<NoAccess />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
