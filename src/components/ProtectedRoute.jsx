import { Navigate } from "react-router-dom";
import { getAdminToken } from "../utils/adminAuth";

const ProtectedRoute = ({ children }) => {
  const token = getAdminToken();

  // If no token → redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise → allow access
  return children;
};

export default ProtectedRoute;
