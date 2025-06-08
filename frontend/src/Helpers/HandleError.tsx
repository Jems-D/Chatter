import axios from "axios";
import { Bounce, toast } from "react-toastify";

export const handleError = (error: Error) => {
  const isDarkMode = document.documentElement.classList.contains("dark");

  if (axios.isAxiosError(error)) {
    var err = error.response;
    if (Array.isArray(err?.data.error)) {
      for (let val of err?.data.error) {
        toast.error(val, {
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
    } else if (typeof err?.data.error === "object") {
      for (let e in err.data.error) {
        toast.error(e, {
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
