import { Navigate, useLocation } from "react-router-dom";
import Header from "../components/layouts/Header";

const PublicRoute = ({ children }) => {
  const location = useLocation();
  // const hideHeaderPaths = ["/event-booking/:id/get-ticket"]; // Simplified pattern

  // A function to match the current path against a pattern
  const shouldHideHeader = location.pathname.includes("/get-ticket");

  try {
    return (
      <>
        {!shouldHideHeader && <Header />}
        {/* <Header/> */}
        {children}
      </>
    );
  } catch (err) {
    return <Navigate to="/home" />;
  }
};

export default PublicRoute;
