import { Navigate } from "react-router-dom";
import { useStorage } from "../utils/storage";

const PublicRouteWithoutHeader = ({ children }) => {
  const { getAccessToken } = useStorage();

  try {
    const token = getAccessToken();
    if (!token) {
      return children; // Render only children, no header
    } else {
      return <Navigate to="/app/overview" />;
    }
  } catch (err) {
    return <Navigate to="/home" />;
  }
};

export default PublicRouteWithoutHeader;