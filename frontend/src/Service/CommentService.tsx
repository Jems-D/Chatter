import axios from "axios";
import { handleError } from "../Helpers/HandleError";
import type { Comments } from "../Model/Comments";

const commentUrl = import.meta.env.VITE_APP_COMMENT_URL;

export const GetAllCommentsAsync = async (chatId: number) => {
  try {
    const result = await axios.get<Comments[]>(
      `${commentUrl}?chatId=${chatId}`,
      {
        withCredentials: true,
      }
    );
    return result;
  } catch (err: any) {
    handleError(err);
  }
};

export const CreateCommentAsync = async (chatId: number, content: string) => {
  try {
    const result = await axios.post<number>(
      `${commentUrl}/${chatId}`,
      {
        content: content,
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
