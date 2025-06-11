import type { Reactions } from "./Reaction";

export interface Chats {
  id: number;
  chatTitle: string;
  chatContent: string;
  createdAt: string;
  createdBy: string;
  userId: string;
  reactions: Reactions[];
}
