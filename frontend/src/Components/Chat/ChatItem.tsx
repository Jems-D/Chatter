import React from "react";
import type { Chats } from "../../Model/Chats";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

interface Props {
  chat: Chats;
}
function ChatItem({ chat }: Props) {
  console.log("dito", chat);
  return (
    <Card className="bg-[var(--bg_color_dark)] text-[var(--color_text_white_i) dark:text=[var(--color_text_dark_i)] dark:bg-[var(--bg_color_white)] w-[300px] h-auto flex-col gap-2">
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
      <CardContent className="text-left text-pretty">
        {chat.chatContent}
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}

export default ChatItem;
