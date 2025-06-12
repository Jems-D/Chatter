import React from "react";
import type { Emoji } from "../../Model/Emoji";

interface Props {
  emoji: Emoji;
}

const ReactionItem = ({ emoji }: Props) => {
  return <div className="">{emoji.emojiSymbol}</div>;
};

export default ReactionItem;
