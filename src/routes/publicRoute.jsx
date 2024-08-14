import { Navigate, useLocation } from "react-router-dom";

const PublicRoute = ({ children }) => {
  try {
    const token = sessionStorage.getItem("TOKEN");
    if (!token) {
      return children;
    } else {
      return <Navigate to="/app/overview" />;
    }
  } catch (err) {
    return <Navigate to="/home" />;
  }
};

export default PublicRoute;
