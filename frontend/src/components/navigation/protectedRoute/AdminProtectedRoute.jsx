import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
	const { userAuth } = useSelector((state) => state?.user);

	if (!userAuth) {
		return <Navigate to="/login" replace />;
	} else if (userAuth && !userAuth?.isAdmin) {
		return <Navigate to="/no-access" replace />;
	}

	return <Outlet />;
};

export default AdminProtectedRoute;
