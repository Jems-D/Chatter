import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import type { Emoji } from "../../Model/Emoji";
import { useState, type SyntheticEvent } from "react";

interface Props {
  emojis: Emoji[];
  onReactionSubmit: (e: SyntheticEvent) => void;
}

const EmojiPicker = ({ emojis, onReactionSubmit }: Props) => {
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="text-xl hover:!bg-[var(--color_appledark)]"
        >
          ☺
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <ul className="list-none inline-flex flex-wrap bg-accent gap-2 p-2 rounded-sm">
          {emojis.map((emoji, index) => {
            return (
              <li key={`emoji-${emoji}-${index}`}>
                <form
                  onSubmit={(e) => {
                    onReactionSubmit(e);
                    setPopoverOpen(false);
                  }}
                >
                  <input hidden readOnly value={emoji.emojiId} />
                  <button
                    type="submit"
                    className="cursor-pointer hover:text-red-500"
                  >
                    {emoji.emojiSymbol}
                  </button>
                </form>
              </li>
            );
          })}
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPicker;
