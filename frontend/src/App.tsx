import "./App.css";
import { Outlet } from "react-router-dom";
import { UserProvider } from "./Context/useAuth";
import { Bounce, ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  const isDarkMode = document.documentElement.classList.contains("dark");
  return (
    <>
      <UserProvider>
        <div className="text-3xl dark:bg-[var(--bg_color_dark_i)] dark:text-[var(--color_text_dark_1)] mb-10">
          CHATTER
        </div>
        <QueryClientProvider client={queryClient}>
          <Outlet />
          <ToastContainer
            position="top-right"
            hideProgressBar={true}
            autoClose={5000}
            pauseOnHover={true}
            transition={Bounce}
            closeButton={true}
            theme={`${isDarkMode ? "dark" : "colored"}`}
          />
        </QueryClientProvider>
      </UserProvider>
    </>
  );
}

export default App;
