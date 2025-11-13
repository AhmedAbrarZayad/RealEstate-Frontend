import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    // redirect to login, preserving the intended route
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
