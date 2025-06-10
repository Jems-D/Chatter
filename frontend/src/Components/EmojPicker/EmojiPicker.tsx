import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import type { Emoji } from "../../Model/Emoji";

interface Props {
  emojis: Emoji[];
}

const EmojiPicker = ({ emojis }: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="text-xl hover:!bg-[var(--color_appledark)]"
        >
          ☺
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <ul className="list-none inline-flex flex-wrap bg-accent gap-2">
          {emojis.map((emoji, index) => {
            return <li key={`emoji-${emoji}-${index}`}>{emoji.emojiSymbol}</li>;
          })}
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPicker;
