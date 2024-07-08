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
  VendorPage,
} from "../pages";
import RouteGuard from "./routeGuard";

const AuthenticatedRoutes = () => {
  const isAuthenticated = !!sessionStorage.getItem("TOKEN");

  return (
    <RouteGuard isAllowed={isAuthenticated}>
      <Routes>
        <Route path="overview" element={<OverviewDashboardPage />} />
        <Route path="events" element={<EventsDashboardPage />} />
        <Route path="order" element={<OrdersDashboardPage />} />
        <Route path="finance" element={<FinancesDashboardPage />} />
        <Route path="/create-event" element={<VendorPage />} />,
        <Route
          path="organization-settings"
          element={<OrganizationSettingsDashboardPage />}
        />
        <Route path="event" element={<EventsPage />} />
        <Route path="event-category" element={<EventCategoryPage />} />
        <Route path="event-booking" element={<EventBookingPage />} />
        <Route path="my-tickets" element={<TicketDashboardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </RouteGuard>
  );
};

export default AuthenticatedRoutes;
