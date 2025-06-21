import axios from "axios";
import { handleError } from "../Helpers/HandleError";
import type { UserQuery } from "../Model/Forms";
import type { User } from "../Model/User";

const userUrl = import.meta.env.VITE_APP_ADMIN_USER_URL;

export const GetAllUsersAsync = async () => {
  try {
    const userLists = await axios.get<User[]>(`${userUrl}`, {
      withCredentials: true,
    });
    return userLists;
  } catch (err: any) {
    handleError(err);
  }
};

export const ChangeRoleAsync = async (id: string, newRole: string) => {
  try {
    const result = await axios.patch<void>(
      `${userUrl}/${id}`,
      {
        newRole: newRole,
      },
      {
        withCredentials: true,
      }
    );
    return result;
  } catch (err: any) {
    handleError(err);
  }
};
