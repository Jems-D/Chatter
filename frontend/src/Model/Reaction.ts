import type { Emoji } from "./Emoji";

export interface Reactions {
  reactionId: number;
  chatId: number;
  userId: string;
  emojiId: number;
  emojis: Emoji;
}
