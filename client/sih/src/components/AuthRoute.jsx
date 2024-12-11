import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (token && user.role) {
    // Already logged in, redirect to appropriate dashboard
    return <Navigate to={`/dashboard/${user.role}`} replace />;
  }

  return children;
};

export default AuthRoute;
