import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import type { Emoji } from "../../Model/Emoji";
import { useState, type SyntheticEvent } from "react";
import type { QueryObserverResult } from "@tanstack/react-query";
import type { Chats } from "../../Model/Chats";
import { SmilePlus } from "lucide-react";

interface Props {
  emojis: Emoji[];
  onReactionSubmit: (e: SyntheticEvent) => void;
  refetch: () => Promise<QueryObserverResult<Chats[], unknown>>;
}

const EmojiPicker = ({ emojis, onReactionSubmit, refetch }: Props) => {
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);

  console.log("EmojiPicker refetch:", refetch);

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="hover:!text-blue-500 w-[24px] dark:hover:!bg-[var(--color_appledark)] hover:!bg-[var(--color_applewhite)] cursor-pointer"
        >
          <SmilePlus strokeWidth={1} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <ul className="list-none inline-flex flex-wrap bg-accent gap-2 p-2 rounded-sm">
          {emojis.map((emoji, index) => {
            return (
              <li key={`emoji-${emoji}-${index}`}>
                <form
                  onSubmit={async (e) => {
                    await onReactionSubmit(e);
                    setPopoverOpen(false);
                    await refetch();
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
