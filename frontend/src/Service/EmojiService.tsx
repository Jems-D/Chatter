import axios from "axios";
import { handleError } from "../Helpers/HandleError";
import type { Emoji } from "../Model/Emoji";
const emojiUrl = import.meta.env.VITE_APP_EMOJI_URL;

export const GetAllEmojisAsync = async () => {
  try {
    const resullt = await axios.get<Emoji[]>(`${emojiUrl}`, {
      withCredentials: true,
    });
    return resullt;
  } catch (err: any) {
    handleError(err);
  }
};
