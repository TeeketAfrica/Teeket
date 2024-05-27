import { Routes, Route } from "react-router-dom";

import {
  EventsDashboardPage,
  OverviewDashboardPage,
  FinancesDashboardPage,
  OrdersDashboardPage,
  OrganizationSettingsDashboardPage,
  EventsPage,
  EventCategoryPage,
  TicketDashboardPage,
  EventBookingPage,
  NotFoundPage,
} from "../pages";
import RouteGuard from "./routeGuard";
// import { useSelector } from "react-redux";
// import { selectUserDetails } from "../features/userSlice";
import useIsUserAuthenticated from "./useIsUserAuthenticated";

// const isUserAuthenticated = () => {
//   const { token } = useSelector(selectUserDetails);

//   if (token) {
//     return true;
//   }

//   return false;
// };

const AuthenticatedRoutes = () => {
  const isAuthenticated = useIsUserAuthenticated();

  return (
    <RouteGuard isAllowed={isAuthenticated}>
      <Routes>
        <Route path="overview" element={<OverviewDashboardPage />} />
        <Route path="events" element={<EventsDashboardPage />} />
        <Route path="order" element={<OrdersDashboardPage />} />
        <Route path="finance" element={<FinancesDashboardPage />} />
        <Route
          path="organization-settings"
          element={<OrganizationSettingsDashboardPage />}
        />
        <Route path="events" element={<EventsPage />} />
        <Route path="event-category" element={<EventCategoryPage />} />
        <Route path="event-booking" element={<EventBookingPage />} />
        <Route path="my-tickets" element={<TicketDashboardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </RouteGuard>
  );
};

export default AuthenticatedRoutes;
