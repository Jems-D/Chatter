import React from "react";
import { useAuth } from "../Context/useAuth";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoutes = ({ children, allowedRoles }: Props) => {
  const { isAuthenticated, user } = useAuth();

  const userRole = user?.role;

  if (!isAuthenticated()) {
    return (
      <Navigate
        to="/unauthorize"
        replace
        state={{ fromProtectedRoute: true }}
      />
    ); // will be used so that users can manually enter the status pages
  }

  if (!user || !allowedRoles.includes(userRole!)) {
    return (
      <Navigate to="/forbidden" replace state={{ fromProtectedRoute: true }} />
    ); // will be used so that users cannot manually enter the status pages
  }

  return children;
};

export default ProtectedRoutes;
