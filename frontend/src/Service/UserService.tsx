import axios from "axios";
import { handleError } from "../Helpers/HandleError";
import type { UserQuery } from "../Model/Forms";
import type { User } from "../Model/User";

const userUrl = import.meta.env.VITE_APP_ADMIN_USER_URL;

export const GetAllUsersAsync = async (query?: UserQuery) => {
  try {
    const userLists = await axios.get<User[]>(`${userUrl}`, {
      withCredentials: true,
    });
    return userLists;
  } catch (err: any) {
    handleError(err);
  }
};
