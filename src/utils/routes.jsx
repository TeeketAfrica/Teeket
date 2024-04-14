import {
  HomePage,
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
} from "../pages";

export const routes = [
  // Landing Page
  { path: "/", element: <HomePage /> },

  // Authenticated Pages
  { path: "/auth/login", element: <LoginPage /> },
  { path: "/auth/create-account", element: <CreateAccountPage /> },
  { path: "/auth/password-recovery", element: <PasswordRecoveryPage /> },
  { path: "/auth/password-reset", element: <PasswordResetPage /> },

  // Other Pages
  { path: "/create-event", element: <VendorPage /> },
  { path: "/help-and-support", element: <HelpAndSupportPage /> },

  // Dashboard Pages
  { path: "/app/overview", element: <OverviewDashboardPage /> },
  { path: "/app/events", element: <EventsDashboardPage /> },
  { path: "/app/order", element: <OrdersDashboardPage /> },
  { path: "/app/finance", element: <FinancesDashboardPage /> },
  {
    path: "/app/organization-settings",
    element: <OrganizationSettingsDashboardPage />,
  },

  // Events Pages
  { path: "/events", element: <EventsPage /> },
  { path: "/event-category", element: <EventCategoryPage /> },

  // Tickets Pages
  { path: "/my-tickets", element: <TicketDashboardPage /> },
];
