import {
  HomePage,
  CounterDownPage,
  LoginPage,
  CreateAccountPage,
  PasswordRecoveryPage,
  PasswordResetPage,
  VendorPage,
  EventsDashboardPage,
  OverviewDashboardPage,
  FinancesDashboardPage,
  OrdersDashboardPage,
  OrganizationSettingsDashboardPage,
  HelpAndSupportPage,
  EventsPage,
  EventCategoryPage,
  TicketDashboardPage,
  EventBookingPage,
} from "../pages";
import { PrivateRoute } from "./PrivateRoute";

const routes = [
  //Public Routes
  { path: "/", element: <CounterDownPage /> },
  { path: "/home", element: <HomePage /> },
  { path: "/help-and-support", element: <HelpAndSupportPage /> },
  { path: "/events", element: <EventsPage /> },
  { path: "/event-category", element: <EventCategoryPage /> },
  { path: "/my-tickets", element: <TicketDashboardPage /> },
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
  {
    path: "/auth/create-account",
    element: <CreateAccountPage />,
  },
  {
    path: "/auth/password-recovery",
    element: <PasswordRecoveryPage />,
  },
  {
    path: "/auth/password-reset",
    element: <PasswordResetPage />,
  },

  //Authenticated Routes
  {
    path: "/create-event",
    element: (
      <PrivateRoute>
        <VendorPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/app/overview",
    element: (
      <PrivateRoute>
        <OverviewDashboardPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/app/events",
    element: (
      <PrivateRoute>
        <EventsDashboardPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/app/order",
    element: (
      <PrivateRoute>
        <OrdersDashboardPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/app/finance",
    element: (
      <PrivateRoute>
        <FinancesDashboardPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/app/organization-settings",
    element: (
      <PrivateRoute>
        <OrganizationSettingsDashboardPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/event-booking",
    element: (
      <PrivateRoute>
        <EventBookingPage />
      </PrivateRoute>
    ),
  },
];

export default routes;
