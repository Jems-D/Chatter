import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../Pages/Shared/Dashboard";
import LoginPage from "../Pages/Authentication/LoginPage";
import RegisterPage from "../Pages/Authentication/RegisterPage";

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
    element: <LoginPage />,
  },
  {
    path: "/create-acc",
    element: <RegisterPage />,
  },
  {
    path: "*",
    element: null,
  },
]);
