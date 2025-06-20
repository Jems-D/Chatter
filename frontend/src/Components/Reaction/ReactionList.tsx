import React, { type SyntheticEvent } from "react";
import type { Reactions } from "../../Model/Reaction";
import ReactionItem from "./ReactionItem";
import type { QueryObserverResult } from "@tanstack/react-query";
import type { Chats } from "../../Model/Chats";

interface Props {
  reactions: Reactions[];
  onDelete: (e: SyntheticEvent) => void;
  refetch: () => Promise<QueryObserverResult<Chats[], unknown>>;
}

const ReactionList = ({ reactions, onDelete, refetch }: Props) => {
  return (
    <ul className="list-none flex flex-wrap">
      {reactions.map((reaction, index) => {
        return (
          <li key={`${index}-key`}>
            <ReactionItem
              emoji={reaction.emojis}
              userId={reaction.userId}
              reactionId={reaction.reactionId}
              onDelete={onDelete}
              refetch={refetch}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ReactionList;
