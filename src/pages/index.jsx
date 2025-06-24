import HomePage from "./home";
import LoginPage from "./auth/login";
import CreateAccountPage from "./auth/create-account";
import PasswordRecoveryPage from "./auth/password-recovery";
import SendOTPPage from "./auth/send-otp";
import PasswordResetPage from "./auth/password-reset";
import VendorPage from "./create-event";
import EventsDashboardPage from "./vendor-dashboard/events";
import FinancesDashboardPage from "./vendor-dashboard/finances";
import OverviewDashboardPage from "./vendor-dashboard/overview";
import OrdersDashboardPage from "./vendor-dashboard/orders";
import OrganizationSettingsDashboardPage from "./vendor-dashboard/organization-settings";
import HelpAndSupportPage from "./help-and-support";
import AboutPage from "./about";
import ContactUsPage from "./contact-us";
import EventsPage from "./events";
import EventCategoryPage from "./events/EventCategoryPage";
import TicketDashboardPage from "./ticket-dashboard/index";
import EventBookingPage from "./events/EventBookingPage";
import CounterDownPage from "./count-down";
import NotFoundPage from "./not-found";
import AccountSettingsPage from "./account-settings";
import EventGetTicket from "./events/EventGetTicket";
import ContactPage from "./contact";

export {
  HomePage,
  LoginPage,
  CreateAccountPage,
  SendOTPPage,
  PasswordRecoveryPage,
  PasswordResetPage,
  VendorPage,
  AboutPage,
  ContactPage,
  HelpAndSupportPage,
  ContactUsPage,

  // DASHBOARD PAGES
  EventsDashboardPage,
  FinancesDashboardPage,
  OverviewDashboardPage,
  OrdersDashboardPage,
  OrganizationSettingsDashboardPage,

  // EVENTS PAGE
  EventsPage,
  EventCategoryPage,
  EventBookingPage,
  EventGetTicket,

  // TICKETS PAGE
  TicketDashboardPage,
  CounterDownPage,

  // 404 PAGE
  NotFoundPage,

  // ACCOUNT SETTINGS PAGE
  AccountSettingsPage,
};
