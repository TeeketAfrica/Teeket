import { Navigate } from "react-router-dom";
import { useStorage } from "../utils/storage";

const PrivateRoute = ({ children }) => {
  const { getAccessToken } = useStorage();

  try {
    const token = getAccessToken();
    if (token) {
      return children;
    } else {
      return <Navigate to="/auth/login" />;
    }
  } catch (err) {
    console.log(err)
    return <Navigate to="/auth/login" />;
  }
};

export default PrivateRoute;
