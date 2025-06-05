import axios from "axios";
import { handleError } from "../Helpers/HandleError";
import type { Chats } from "../Model/Chats";

const chatUrl = import.meta.env.VITE_APP_CHAT_URL;

export const GetAllChatsAsync = async () => {
  try {
    const result = await axios.get<Chats>(`${chatUrl}`, {
      withCredentials: true,
    });

    return result;
  } catch (err: any) {
    handleError(err);
  }
};
