import axios from "axios";
import { handleError } from "../Helpers/HandleError";

const reactionUrl = import.meta.env.VITE_APP_REACTION_URL;

export const AddReactionAsync = async (emojiId: number, chatId: number) => {
  try {
    const result = await axios.post<void>(
      `${reactionUrl}`,
      {
        emojiId: emojiId,
        chatId: chatId,
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
