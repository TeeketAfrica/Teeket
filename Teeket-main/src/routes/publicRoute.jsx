import { Navigate } from "react-router-dom";
import { useStorage } from "../utils/storage";
import Header from "../components/layouts/Header";

const PublicRoute = ({ children }) => {

  try {
    return (
      <>
        <Header/>
        {children}
      </>
    )
  } catch (err) {
    return <Navigate to="/home" />;
  }
};

export default PublicRoute;
