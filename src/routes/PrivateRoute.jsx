import { Navigate, useLocation } from "react-router-dom";
import { useStorage } from "../utils/storage";
import { useSelector } from "react-redux";
import { selectActiveUser } from "../features/activeUserSlice";

const PrivateRoute = ({ children }) => {
  const { getAccessToken } = useStorage();
  const activeUser = useSelector(selectActiveUser);
  const location = useLocation();

  try {
    const token = getAccessToken();
    if (!token) {
      return <Navigate to="/auth/login" />;
    }

    // Special case: protect /app/overview to only allow 'creator'
    if (location.pathname === "/app/overview") {
      if (!activeUser?.is_creator) {
        return <Navigate to="/events" />;
      }
    }

    return children;
  } catch (err) {
    console.error(err);
    return <Navigate to="/auth/login" />;
  }
};

export default PrivateRoute;
