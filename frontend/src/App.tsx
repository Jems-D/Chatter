import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Outlet } from "react-router-dom";
import { UserProvider } from "./Context/useAuth";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <UserProvider>
        <div className="text-3xl dark:bg-[var(--bg_color_dark_i)] dark:text-[var(--color_text_dark_1)] mb-10">
          CHATTER
        </div>
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
        <ToastContainer />
      </UserProvider>
    </>
  );
}

export default App;
