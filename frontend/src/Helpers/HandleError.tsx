import axios from "axios";
import { toast } from "react-toastify";
import { object } from "yup";

export const handleError = (error: Error) => {
  if (axios.isAxiosError(error)) {
    var err = error.response;
    if (Array.isArray(err?.data.error)) {
      for (let val of err?.data.error) {
        toast.error(val);
      }
    } else if (typeof err?.data.error === "object") {
      for (let e in err.data.error) {
        toast.error(e);
      }
    } else if (err?.data) {
      toast.error(err?.data);
    } else if (err) {
      toast.error(err?.data);
    }
  }
};
