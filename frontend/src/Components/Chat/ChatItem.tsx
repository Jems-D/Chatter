import { useEffect, useState } from "react";
import type { Chats } from "../../Model/Chats";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import type { Emoji } from "../../Model/Emoji";
import { GetAllEmojisAsync } from "../../Service/EmojiService";
import EmojiPicker from "../EmojPicker/EmojiPicker";
import {
  AddReactionAsync,
  RemoveReactionAsync,
} from "../../Service/ReactionService";
import { toast } from "react-toastify";
import ReactionList from "../Reaction/ReactionList";
import type { QueryObserverResult } from "@tanstack/react-query";
import OpenChat from "../ChatView/OpenChat";
import ChatMenu from "../ChatMenu/ChatMenu";
import { DeleteChatAsync } from "../../Service/ChatService";
import { useAuth } from "../../Context/useAuth";
import { hasPermission, type Role } from "../../Helpers/RoleBasedAccessControl";
interface Props {
  chat: Chats;
  refetch: () => Promise<QueryObserverResult<Chats[], unknown>>;
  isOpen?: boolean;
}
function ChatItem({ chat, refetch, isOpen = false }: Props) {
  const [emoji, setEmoji] = useState<Emoji[]>([]);

  const { user } = useAuth();

  const userPermissions: {
    id: string;
    role: Role;
    username: string;
    emailAddress: string;
  } = {
    id: user?.id ?? "0",
    role: user?.role ?? "Anonymous",
    username: user?.username ?? "anon",
    emailAddress: user?.emailAddress ?? "anon@mail.com",
  };

  const onReactionSubmit = async (e: any) => {
    e.preventDefault();
    await AddReactionAsync(e.target[0].value, chat.id)
      .then((res) => {
        if (res?.status === 201) {
          toast.success("Reaction added");
        }
      })
      .catch((e) => console.log(e.message));
  };

  const onReactionDelete = async (e: any) => {
    e.preventDefault();
    await RemoveReactionAsync(e.target[0].value).then((res) => {
      if (res?.status === 204) {
        toast.success("Reaction Removed");
      }
    });
  };

  const onChatDelete = async (e: any) => {
    e.preventDefault();
    await DeleteChatAsync(chat.id).then((res) => {
      if (res?.status === 204) {
        toast.success("Post removed");
        refetch();
      }
    });
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

  return (
    <Card
      className={` text-[var(--color_text_white_i) dark:text=[var(--color_text_dark_i)]  w-[300px] h-auto flex-col gap-2 dark:bg-[var(--color_appledark)] ${
        isOpen === false
          ? "shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-[var(--color_applewhite)] w-[300px]"
          : "!shadow-none border-0 w-auto bg-white !rounded-0"
      }`}
    >
      <CardHeader className="flex-col gap-2">
        <div className="flex justify-between">
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
          {(hasPermission(userPermissions, "update:ownChats") ||
            hasPermission(userPermissions, "delete:ownChats") ||
            hasPermission(userPermissions, "delete:chats")) && (
            <div className={`ml-auto ${isOpen ? "hidden" : ""}`}>
              <ChatMenu onDelete={onChatDelete} userId={chat.createdById} />
            </div>
          )}
        </div>

        <div>
          <h3 className="text-xl font-bold text-left">{chat.chatTitle}</h3>
        </div>
      </CardHeader>
      <CardContent className="text-left text-pretty break-all">
        {chat.chatContent}
      </CardContent>
      <CardFooter className="flex-col">
        {hasPermission(userPermissions, "add:reactions") &&
          hasPermission(userPermissions, "create:comments") &&
          !isOpen && (
            <div className="flex w-full justify-end">
              <div>
                <EmojiPicker
                  emojis={emoji}
                  onReactionSubmit={onReactionSubmit}
                  refetch={refetch}
                />
              </div>
              <div className="">
                <OpenChat chat={chat} />
              </div>
            </div>
          )}
        <div className="flex w-full !justify-start">
          <ReactionList
            reactions={chat.reactions}
            onDelete={onReactionDelete}
            refetch={refetch}
          />
        </div>
      </CardFooter>
    </Card>
  );
}

export default ChatItem;
