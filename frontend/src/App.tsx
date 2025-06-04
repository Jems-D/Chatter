import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Outlet } from "react-router-dom";
import { UserProvider } from "./Context/useAuth";

function App() {
  return (
    <>
      <div className="text-3xl">HELLOOOOO</div>
      <Outlet />
    </>
  );
}

export default App;
