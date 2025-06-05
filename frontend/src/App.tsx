import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Outlet } from "react-router-dom";
import { UserProvider } from "./Context/useAuth";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <UserProvider>
        <div className="text-3xl dark:bg-[var(--bg_color_dark_i)]">CHATTER</div>
        <Outlet />
        <ToastContainer />
      </UserProvider>
    </>
  );
}

export default App;
