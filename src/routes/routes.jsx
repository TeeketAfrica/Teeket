import {
  AccountSettingsPage,
  CounterDownPage,
  CreateAccountPage,
  EventBookingPage,
  EventCategoryPage,
  EventGetTicket,
  EventsDashboardPage,
  EventsPage,
  FinancesDashboardPage,
  HelpAndSupportPage,
  HomePage,
  LoginPage,
  OrdersDashboardPage,
  OrganizationSettingsDashboardPage,
  OverviewDashboardPage,
  PasswordRecoveryPage,
  PasswordResetPage,
  SendOTPPage,
  TicketDashboardPage,
  VendorPage,
  AboutPage,
  ContactPage,
} from "../pages";
import NotFound from "../pages/404/404";
import SimilarEvents from "../pages/events/SimilarEvents";
import privacyPolicy from "../pages/Privacy-Policy/privacyPolicy";
import securityPolicy from "../pages/Security-policy/securityPolicy";
import Tou from "../pages/Terms-of-use/Tou";
import PreviewScanned from "../pages/vendor-dashboard/events/components/PreviewScanned";
import ScanToAttend from "../pages/vendor-dashboard/events/components/ScanToAttend";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./publicRoute";
import PublicTokenRoute from "./publicRoutes";
import PublicRouteWithoutHeader from "./PublicRoutesWithoutHeader";

const publicRoutes = [
  { path: "/", element: HomePage},
  // { path: "/help-and-support", element: HelpAndSupportPage },
  { path: "/contact", element: ContactPage },
  { path: "/about", element: AboutPage },
  { path: "/events", element: EventsPage },
  { path: "/terms-of-use", element:  Tou},
  { path: "/privacy-policy", element: privacyPolicy},
  { path: "/security-policy", element: securityPolicy },
  { path: "/event-category/:type?", element: EventCategoryPage },
  { path: "/account-settings", element: AccountSettingsPage },
  { path: "/events/similar-events/:id?", element: SimilarEvents },
  { path: "/event-booking/:id?", element: EventBookingPage },
  { path: "/event-booking/:id?/get-ticket", element: EventGetTicket },

  {path: "*", element: NotFound}
];

const privateRoutes = [
  { path: "/create-event", element: VendorPage },
  { path: "/edit-event/:id?", element: VendorPage },
  { path: "/app/overview", element: OverviewDashboardPage },
  { path: "/app/events", element: EventsDashboardPage },
  { path: "/app/order", element: OrdersDashboardPage },
  { path: "/app/finance", element: FinancesDashboardPage },
  { path: "/app/scan-to-attend", element: ScanToAttend },
  { path: "/app/preview-scanned/:id?", element:  PreviewScanned},
  { path: "/account-settings", element: AccountSettingsPage },
  { path: "/my-tickets", element: TicketDashboardPage },
  {
    path: "/app/organization-settings",
    element: OrganizationSettingsDashboardPage,
  }
];

const publicRoutesWithoutAuth = [
  { path: "/countdown", element: CounterDownPage },
  { path: "/auth/password-recovery", element: PasswordRecoveryPage },
  { path: "/auth/reset-password/:id/:token", element: PasswordResetPage },
  { path: "/auth/send-otp", element: SendOTPPage },
];


const publicRoutesWithTokenRedirect = [
  { path: "/auth/login", element: LoginPage },
  { path: "/auth/create-account", element: CreateAccountPage },
];

const routes = [
  ...publicRoutes.map((route) => ({
    path: route.path,
    element: (
      <PublicRoute>
        <route.element />
      </PublicRoute>
    ),
  })),
  ...publicRoutesWithoutAuth.map((route) => ({
    path: route.path,
    element: (
      <PublicRouteWithoutHeader>
        <route.element />
      </PublicRouteWithoutHeader>
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
  ...publicRoutesWithTokenRedirect.map((route) => ({
    path: route.path,
    element: (
      <PublicTokenRoute
        element={
          <PublicRouteWithoutHeader>
            <route.element />
          </PublicRouteWithoutHeader>
        }
      />
    ),
  })),
];

export default routes;
