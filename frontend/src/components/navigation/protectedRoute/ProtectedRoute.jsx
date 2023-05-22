import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
	const { userAuth } = useSelector((state) => state?.user);

	if (!userAuth) return <Navigate to="/login" replace />;

	return <Outlet />;
};

export default ProtectedRoute;
