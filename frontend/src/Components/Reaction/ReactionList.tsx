import React from "react";
import type { Reactions } from "../../Model/Reaction";
import ReactionItem from "./ReactionItem";

interface Props {
  reactions: Reactions[];
}

const ReactionList = ({ reactions }: Props) => {
  return (
    <ul className="list-none flex flex-wrap">
      {reactions.map((reaction, index) => {
        return (
          <li key={`${index}-key`}>
            <ReactionItem emoji={reaction.emojis} />
          </li>
        );
      })}
    </ul>
  );
};

export default ReactionList;
