import React, { type SyntheticEvent } from "react";
import type { Emoji } from "../../Model/Emoji";
import { useAuth } from "../../Context/useAuth";
import type { QueryObserverResult } from "@tanstack/react-query";
import type { Chats } from "../../Model/Chats";

interface Props {
  emoji: Emoji;
  userId: string;
  reactionId: number;
  onDelete: (e: SyntheticEvent) => void;
  refetch: () => Promise<QueryObserverResult<Chats[], unknown>>;
}

const ReactionItem = ({
  emoji,
  userId,
  reactionId,
  onDelete,
  refetch,
}: Props) => {
  const { user } = useAuth();

  return (
    <div
      className={`${
        user?.id === userId
          ? "bg-[var(--color_reactionblue)]  rounded-full"
          : ""
      } p-1`}
    >
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (user?.id == userId) {
            await onDelete(e);
            await refetch();
          }
        }}
      >
        <input hidden readOnly value={reactionId} />
        <button
          type="submit"
          className={`${user?.id === userId ? "cursor-pointer" : ""}`}
        >
          {emoji.emojiSymbol}
        </button>
      </form>
    </div>
  );
};

export default ReactionItem;
