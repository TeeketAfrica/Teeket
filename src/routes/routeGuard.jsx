import React from "react";
import { Navigate } from "react-router-dom";

const RouteGuard = ({ isAllowed, redirectPath = "/auth/login", children }) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace={true} />;
  }

  return children;
};

export default RouteGuard;
