import { injectAuthHandlers } from "../Interceptor/axiosSetup";
import type { UserContextType, UserResponse } from "../Model/User";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  LoginAccountAsync,
  LogoutUserAsync,
  RegisterAccountAsync,
} from "../Service/AuthService";
import React from "react";
import { createContext } from "react";
import { Bounce, toast } from "react-toastify";

interface Props {
  children: React.ReactNode;
}

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserResponse | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);
  const isDarkMode = document.documentElement.classList.contains("dark");
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    let userData;
    if (storedUser && isAuthenticated) {
      userData = JSON.parse(storedUser);
      setUser(userData);
    }

    // if (userData) {
    //   refreshToken(userData.Id);
    // }

    setIsReady(true);
  }, []);

  const registerUser = async (
    username: string,
    emailAddress: string,
    password: string
  ) => {
    await RegisterAccountAsync(username, emailAddress, password)
      .then((res) => {
        if (res) {
          if (res.status === 201) {
            toast.success("Account Created", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: true,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
              theme: isDarkMode ? "dark" : "colored",
              transition: Bounce,
              closeButton: true,
            });
            navigate("/sign-in");
          }
        }
      })
      .catch((ex) => console.log(ex));
  };

  const loginUser = async (emailAddress: string, password: string) => {
    await LoginAccountAsync(emailAddress, password)
      .then((res) => {
        if (res) {
          if (res.status === 200) {
            localStorage.setItem("isAuthenticated", JSON.stringify(true));
            const userData: UserResponse = {
              id: res?.data.id,
              username: res?.data.username,
              role: res?.data.role,
              emailAddress: res?.data.emailAddress,
            };

            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);
            toast.success("Logged in successfully", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: true,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
              theme: isDarkMode ? "dark" : "colored",
              transition: Bounce,
              closeButton: true,
            });
            navigate("/");
            window.location.reload();
          }
        }
      })
      .catch((error) => console.log("Something's wrong", error));
  };

  const isAuthenticated = () => {
    return !!user;
  };

  const logoutUser = async () => {
    await LogoutUserAsync().then((res) => {
      if (res) {
        if (res.status === 200) {
          setUser(null);
          localStorage.setItem("isAuthenticated", JSON.stringify(false));
          localStorage.removeItem("user");
          toast.success("Logged out successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: isDarkMode ? "dark" : "colored",
            transition: Bounce,
            closeButton: true,
          });
          navigate("/");
        }
      }
    });
  };

  useEffect(() => {
    injectAuthHandlers(() => user?.id ?? null, logoutUser);
  }, [user, logoutUser]);

  return (
    <UserContext.Provider
      value={{
        loginUser,
        user,
        isAuthenticated,
        registerUser,
        logoutUser,
      }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);
