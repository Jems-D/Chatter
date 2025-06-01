import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../Pages/Shared/Dashboard";
import LoginPage from "../Pages/Authentication/LoginPage";
import RegisterPage from "../Pages/Authentication/RegisterPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/sign-n",
    element: <LoginPage />,
  },
  {
    path: "/sign-out",
    element: <RegisterPage />,
  },
]);
