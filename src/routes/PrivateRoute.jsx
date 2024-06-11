import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectUserDetails } from "../features/userSlice";

function PrivateRoute({ children }) {
  try {
    // const { token } = useSelector(selectUserDetails);
    const token = sessionStorage.getItem("TOKEN");
    if (token) {
      return children;
    } else {
      return <Navigate to="/home" />;
    }
  } catch (err) {
    // authorized so return child components
    return <Navigate to="/home" />;
  }
}

export { PrivateRoute };
