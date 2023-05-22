import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ userAuth, children }) => {
  if (userAuth) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
