import React, { useEffect, useState, type SyntheticEvent } from "react";
import type { Chats } from "../../Model/Chats";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import type { Emoji } from "../../Model/Emoji";
import { GetAllEmojisAsync } from "../../Service/EmojiService";
import EmojiPicker from "../EmojPicker/EmojiPicker";
import { Button } from "../ui/button";
import { AddReactionAsync } from "../../Service/ReactionService";
import { Bounce, toast } from "react-toastify";
import ReactionList from "../Reaction/ReactionList";
import type { QueryObserverResult } from "@tanstack/react-query";
import OpenChat from "../ChatView/OpenChat";
interface Props {
  chat: Chats;
  refetch: () => Promise<QueryObserverResult<Chats[], unknown>>;
  isOpen?: boolean;
}
function ChatItem({ chat, refetch, isOpen = false }: Props) {
  const [emoji, setEmoji] = useState<Emoji[]>([]);
  const isDarkMode = document.documentElement.classList.contains("dark");

  const onReactionSubmit = async (e: any) => {
    e.preventDefault();
    await AddReactionAsync(e.target[0].value, chat.id)
      .then((res) => {
        if (res?.status === 201) {
          toast.success("Reaction added", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: isDarkMode ? "dark" : "colored",
            transition: Bounce,
            closeButton: true,
          });
        }
      })
      .catch((e) => console.log(e.message));
  };

  useEffect(() => {
    fetchEmoji();
  }, []);

  const fetchEmoji = async () => {
    const emojis = await GetAllEmojisAsync();
    if (emojis) {
      setEmoji(emojis.data);
    }
  };

  console.log("Item refetch:", refetch);

  return (
    <Card
      className={` text-[var(--color_text_white_i) dark:text=[var(--color_text_dark_i)]  w-[300px] h-auto flex-col gap-2 dark:bg-[var(--color_appledark)] ${
        isOpen === false
          ? "shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-[var(--color_applewhite)] w-[300px]"
          : "!shadow-none border-0 w-auto bg-white !rounded-0"
      }`}
    >
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
      <CardFooter className="flex-col">
        {!isOpen && (
          <div className="flex w-full justify-end">
            <Button
              variant="ghost"
              className="dark:hover:!bg-[var(--color_appledark)] hover:!bg-[var(--color_applewhite)] hover:!text-blue-500"
            >
              <EmojiPicker
                emojis={emoji}
                onReactionSubmit={onReactionSubmit}
                refetch={refetch}
              />
            </Button>
            <div className="">
              <OpenChat chat={chat} />
            </div>
          </div>
        )}
        <div className="flex w-full !justify-start">
          <ReactionList reactions={chat.reactions} />
        </div>
      </CardFooter>
    </Card>
  );
}

export default ChatItem;
