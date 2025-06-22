import axios from "axios";
import { RecreateRefreshTokenAsync } from "../Service/AuthService";
import { toast } from "react-toastify";

let getUserId: () => string | null = () => null;
let onLogout: () => void = () => {};

export function injectAuthHandlers(
  userIdGetter: () => string | null,
  logoutHandler: () => void
) {
  getUserId = userIdGetter;
  onLogout = logoutHandler;
}

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const userId = getUserId();
      if (userId) {
        try {
          const res = await RecreateRefreshTokenAsync(userId);
          if (res?.status === 200) {
            return axios(originalRequest);
          }
        } catch {}
      }
      onLogout();
      toast.error("Session Expired");
    }
    return Promise.reject(error);
  }
);
