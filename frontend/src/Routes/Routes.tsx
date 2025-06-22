import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../Pages/Shared/Dashboard";
import LoginPage from "../Pages/Authentication/LoginPage";
import RegisterPage from "../Pages/Authentication/RegisterPage";
import { UserProvider } from "../Context/useAuth";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import ProtectedRoutes from "../Routes/ProtectedRoutes";
import UnauthorizePage from "../Pages/ErrorPage/UnauthorizePage";
import Forbidden from "../Pages/ErrorPage/Forbidden";
import { ToastContainer } from "react-toastify";
import AdminDashboard from "../Pages/AdminPages/AdminDashboard";

export const router = createBrowserRouter([
  {
    path: "",
    element: (
      <UserProvider>
        <App />
      </UserProvider>
    ),
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/admin/dashboard",
        element: (
          <ProtectedRoutes allowedRoles={["Admin"]}>
            <AdminDashboard />
          </ProtectedRoutes>
        ), //to do add protective route
      },
    ],
  },
  {
    path: "/sign-in",
    element: (
      <UserProvider>
        <LoginPage />
        <ToastContainer />
      </UserProvider>
    ),
  },
  {
    path: "/create-acc",
    element: (
      <UserProvider>
        <RegisterPage />
        <ToastContainer />
      </UserProvider>
    ),
  },
  {
    path: "/unauthorize",
    element: <UnauthorizePage />,
  },
  {
    path: "/forbidden",
    element: <Forbidden />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
