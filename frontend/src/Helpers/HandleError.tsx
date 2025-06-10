import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

export const handleError = (error: Error) => {
  const isDarkMode = document.documentElement.classList.contains("dark");
  console.log("handleError", error);
  if (axios.isAxiosError(error)) {
    var err = error.response;

    if (typeof err?.data === "string") {
      toast.error(err.data, {
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
    } else if (Array.isArray(err?.data.errors)) {
      for (let val of err?.data.errors) {
        toast.warning(val, {
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
      }
    } else if (typeof err?.data.errors === "object") {
      for (let e in err.data.errors) {
        toast.warning(err?.data.errors[e][0], {
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
      }
    } else if (err?.data) {
      toast.error(err?.data, {
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
    } else if (err?.status === 401) {
      toast.error("Session expired", {
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
    } else if (err) {
      toast.error(err?.data, {
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
    }
  }
};
