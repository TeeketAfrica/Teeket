import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom"; // Adjust the import path
import { selectUserDetails } from "../features/userSlice";

const PublicRoute = ({ element }) => {
  const token = useSelector(selectUserDetails)["token"];

  return token ? <Navigate to="/auth/send-otp" replace /> : element;
};

export default PublicRoute;
