import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import NotFound from "./components/not-found/NotFound";
import Register from "./components/auth/register/Register";
import Profile from "./components/profile/Profile";
import Login from "./components/auth/login/Login";
import Navbar from "./components/navigation/Navbar";
import CategoryList from "./components/categories/CategoryList";
import AddCategory from "./components/categories/AddNewCategory";
import { ToastContainer } from "react-toastify";
import EditCategory from "./components/categories/EditCategory";
import ProtectedRoute from "./components/navigation/protectedRoute/ProtectedRoute";

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
					<Route element={<ProtectedRoute />}>
						<Route path="/add-category" element={<AddCategory />} />
						<Route
							path="/edit-category/:categoryId"
							element={<EditCategory />}
						/>
						<Route path="/categories" element={<CategoryList />} />
					</Route>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
