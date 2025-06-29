import axios from "axios";
import { handleError } from "../Helpers/HandleError";
import type { Chats } from "../Model/Chats";

const chatUrl = import.meta.env.VITE_APP_CHAT_URL;

export const GetAllChatsAsync = async () => {
  try {
    const result = await axios.get<Chats[]>(`${chatUrl}`, {
      withCredentials: true,
    });

    return result;
  } catch (err: any) {
    handleError(err);
  }
};

export const CreateChatAsync = async (
  chatTitle: string,
  chatContent: string
) => {
  try {
    const result = await axios.post(
      `${chatUrl}`,
      {
        chatTitle: chatTitle,
        chatContent: chatContent,
      },
      {
        withCredentials: true,
      }
    );
    return result;
  } catch (error: any) {
    handleError(error);
  }
};

export const DeleteChatAsync = async (chatId: number) => {
  try {
    const result = await axios.patch(`${chatUrl}/${chatId}`, null, {
      withCredentials: true,
    });

    return result;
  } catch (err: any) {
    handleError(err);
  }
};
