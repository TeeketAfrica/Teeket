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
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./publicRoute";

const publicRoutes = [
  { path: "/", element: <CounterDownPage /> },
  { path: "/home", element: <HomePage /> },
  { path: "/help-and-support", element: <HelpAndSupportPage /> },
  { path: "/events", element: <EventsPage /> },
  { path: "/event-category", element: <EventCategoryPage /> },
  { path: "/my-tickets", element: <TicketDashboardPage /> },
];

const privateRoutes = [
  { path: "/create-event", element: VendorPage },
  { path: "/app/overview", element: OverviewDashboardPage },
  { path: "/app/events", element: EventsDashboardPage },
  { path: "/app/order", element: OrdersDashboardPage },
  { path: "/app/finance", element: FinancesDashboardPage },
  {
    path: "/app/organization-settings",
    element: OrganizationSettingsDashboardPage,
  },
  { path: "/event-booking", element: EventBookingPage },
];

const publicRoutesWithoutAuth = [
  { path: "/auth/login", element: LoginPage },
  { path: "/auth/create-account", element: CreateAccountPage },
  { path: "/auth/password-recovery", element: PasswordRecoveryPage },
  { path: "/auth/password-reset", element: PasswordResetPage },
];

const routes = [
  ...publicRoutes,
  ...publicRoutesWithoutAuth.map((route) => ({
    path: route.path,
    element: (
      <PublicRoute>
        <route.element />
      </PublicRoute>
    ),
  })),
  ...privateRoutes.map((route) => ({
    path: route.path,
    element: (
      <PrivateRoute>
        <route.element />
      </PrivateRoute>
    ),
  })),
];

export default routes;
