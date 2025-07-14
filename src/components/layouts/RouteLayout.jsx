import ScrollToTop from "../../utils/ScrollToTop";
import { Outlet } from "react-router-dom";

const RouteLayout = () => (
  <>
    <ScrollToTop />
    <Outlet />
  </>
);

export default RouteLayout;
