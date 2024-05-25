import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AuthenticatedRoutes from "./routes/authenticatedRoutes";
import PublicRoute from "./routes/publicRoutes";

import {
  LoginPage,
  CreateAccountPage,
  PasswordRecoveryPage,
  PasswordResetPage,
  VendorPage,
  HelpAndSupportPage,
  NotFoundPage,
  HomePage,
  CounterDownPage,
} from "./pages";

const App = () => (
  <Router>
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicRoute element={<CounterDownPage />} />} />
      <Route path="/home" element={<PublicRoute element={<HomePage />} />} />
      <Route
        path="/auth/login"
        element={<PublicRoute element={<LoginPage />} />}
      />
      <Route
        path="/auth/create-account"
        element={<PublicRoute element={<CreateAccountPage />} />}
      />
      <Route
        path="/auth/password-recovery"
        element={<PublicRoute element={<PasswordRecoveryPage />} />}
      />
      <Route
        path="/auth/password-reset"
        element={<PublicRoute element={<PasswordResetPage />} />}
      />
      <Route
        path="/create-event"
        element={<PublicRoute element={<VendorPage />} />}
      />
      <Route
        path="/help-and-support"
        element={<PublicRoute element={<HelpAndSupportPage />} />}
      />

      {/* Protected Routes */}
      <Route path="/app/*" element={<AuthenticatedRoutes />} />

      {/* Not Found Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
);

export default App;
