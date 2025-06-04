import axios from "axios";
import { object } from "yup";

export const handleError = (error: Error) => {
  if (axios.isAxiosError(error)) {
    var err = error.response;
    if (Array.isArray(err?.data.error)) {
      for (let val of err?.data.error) {
        console.log(val);
      }
    } else if (typeof err?.data.error === "object") {
      for (let e in err.data.error) {
        console.log(e);
      }
    } else if (err?.data) {
      console.log(err?.data);
    } else if (err) {
      console.log(err?.data);
    }
  }
};
