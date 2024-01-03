import {
  HomePage,
  LoginPage,
  CreateAccountPage,
  PasswordRecoveryPage,
  PasswordResetPage,
} from '../pages';

export const routes = [
  // Landing Page
  { path: '/', element: <HomePage /> },

  // Authenticated Pages
  { path: '/auth/login', element: <LoginPage /> },
  { path: '/auth/create-account', element: <CreateAccountPage /> },
  { path: '/auth/password-recovery', element: <PasswordRecoveryPage /> },
  { path: '/auth/password-reset', element: <PasswordResetPage /> },
];
