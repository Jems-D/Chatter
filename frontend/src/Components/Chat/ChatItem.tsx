import React, { useEffect, useState } from "react";
import type { Chats } from "../../Model/Chats";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import type { Emoji } from "../../Model/Emoji";
import { GetAllEmojisAsync } from "../../Service/EmojiService";
import EmojiPicker from "../EmojPicker/EmojiPicker";
import { Button } from "../ui/button";
import { Ghost } from "lucide-react";

interface Props {
  chat: Chats;
}
function ChatItem({ chat }: Props) {
  const [emoji, setEmoji] = useState<Emoji[]>([]);

  useEffect(() => {
    fetchEmoji();
  }, []);

  const fetchEmoji = async () => {
    const emojis = await GetAllEmojisAsync();
    if (emojis) {
      setEmoji(emojis.data);
    }
  };

  return (
    <Card className="bg-[var(--color_applewhite)] text-[var(--color_text_white_i) dark:text=[var(--color_text_dark_i)] dark:bg-[var(--color_appledark)] w-[300px] h-auto flex-col gap-2">
      <CardHeader className="flex-col gap-2">
        <div className="flex gap-1">
          <Avatar className="rounded-[100px] w-[24px] h-[24px]">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcnpng"
              className="rounded-[100px]"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="font-semibold">@{chat.createdBy}</span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-left">{chat.chatTitle}</h3>
        </div>
      </CardHeader>
      <CardContent className="text-left text-pretty break-all">
        {chat.chatContent}
      </CardContent>
      <CardFooter className="flex w-full justify-end">
        <div>
          <Button
            variant="ghost"
            className="hover:!bg-[var(--color_appledark)]"
          >
            💬
          </Button>
        </div>
        <div className="">
          <EmojiPicker emojis={emoji} />
        </div>
      </CardFooter>
    </Card>
  );
}

export default ChatItem;
