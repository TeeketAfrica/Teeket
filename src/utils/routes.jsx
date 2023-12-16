import { HomePage, SigninPage, SignupPage } from "../pages";

export const routes = [
  // Landing Page
  { path: "/", element: <HomePage /> },

  // Authenticated Pages
  { path: "/auth/signin", element: <SigninPage /> },
  { path: "/auth/signup", element: <SignupPage /> },
];
