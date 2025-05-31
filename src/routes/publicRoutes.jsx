import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom"; // Adjust the import path
import { selectUserDetails } from "../features/userSlice";

const PublicTokenRoute = ({ element }) => {
  const location = useLocation();
  const { value, token } = location.state || {};

  return token ? <Navigate to="/auth/send-otp" replace /> : element;
};

export default PublicTokenRoute;
