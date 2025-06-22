import "./App.css";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./Context/useAuth";
import { Bounce, ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { hasPermission, type Role } from "./Helpers/RoleBasedAccessControl";
import { Button } from "./Components/ui/button";
import { LogOut } from "lucide-react";

const queryClient = new QueryClient();

function App() {
  const isDarkMode = document.documentElement.classList.contains("dark");
  const location = useLocation();
  const { user, logoutUser, isAuthenticated } = useAuth();
  const userPermissions: {
    id: string;
    role: Role;
    username: string;
    emailAddress: string;
  } = {
    id: user?.id ?? "0",
    role: user?.role ?? "Anonymous",
    username: user?.username ?? "anon",
    emailAddress: user?.emailAddress ?? "anon@mail.com",
  };

  return (
    <>
      <div className="text-3xl dark:bg-[var(--bg_color_dark_i)] dark:text-[var(--color_text_dark_1)] mb-10">
        <div className="flex w-full">
          <div className="flex-1">
            {hasPermission(userPermissions, "view:users") ? (
              <Link
                to={`${location.pathname === "/" ? "/admin/dashboard" : "/"}`}
              >
                CHATTER
              </Link>
            ) : (
              <span>CHATTER</span>
            )}
          </div>
          <div>
            {isAuthenticated() && (
              <Button
                variant="ghost"
                className="cursor-pointer text-red-600 text-right dark:text-red-400 hover:text-red-600"
                onClick={logoutUser}
              >
                <LogOut strokeWidth={1} />
              </Button>
            )}
          </div>
        </div>
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
    </>
  );
}

export default App;
