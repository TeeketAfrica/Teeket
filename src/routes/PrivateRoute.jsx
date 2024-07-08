import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  try {
    const token = sessionStorage.getItem("TOKEN");
    if (token) {
      return children;
    } else {
      return <Navigate to="/home" />;
    }
  } catch (err) {
    return <Navigate to="/home" />;
  }
};

export default PrivateRoute;
