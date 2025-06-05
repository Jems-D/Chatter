import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../Pages/Shared/Dashboard";
import LoginPage from "../Pages/Authentication/LoginPage";
import RegisterPage from "../Pages/Authentication/RegisterPage";
import { UserProvider } from "../Context/useAuth";

export const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/sign-in",
    element: (
      <UserProvider>
        <LoginPage />
      </UserProvider>
    ),
  },
  {
    path: "/create-acc",
    element: (
      <UserProvider>
        <RegisterPage />
      </UserProvider>
    ),
  },
  {
    path: "*",
    element: null,
  },
]);
