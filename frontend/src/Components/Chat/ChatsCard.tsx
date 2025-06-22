import React, { lazy, Suspense, type SyntheticEvent } from "react";
import type { Chats } from "../../Model/Chats";
import ChatSkeleton from "./ChatSkeleton";
import type { QueryObserverResult } from "@tanstack/react-query";

interface Props {
  chats: Chats[] | undefined;
  refetch: () => Promise<QueryObserverResult<Chats[], unknown>>;
}

const ChatItem = lazy(() => import("../Chat/ChatItem"));

const ChatsCard = ({ chats, refetch }: Props) => {
  if (typeof chats === "undefined") {
    return <h3>No chats fetched</h3>;
  }

  return (
    <ul
      className="list-none columns-1 md:columns-2  lg:columns-3 xl:columns-4"
      id="card"
    >
      {chats.map((chat, index) => {
        return (
          <li
            className="break-inside-avoid w-[250px] md:w[300px]"
            key={`chats-${index}`}
          >
            <Suspense fallback={<ChatSkeleton />}>
              <ChatItem chat={chat} refetch={refetch} />
            </Suspense>
          </li>
        );
      })}
    </ul>
  );
};

export default ChatsCard;
