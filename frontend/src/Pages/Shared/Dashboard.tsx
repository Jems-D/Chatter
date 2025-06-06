import React, { Suspense } from "react";
import ChatItem from "../../Components/Chat/ChatItem";
import { GetAllChatsAsync } from "../../Service/ChatService";
import { array } from "yup";
import ChatsCard from "../../Components/Chat/ChatsCard";
import type { Chats } from "../../Model/Chats";
import { useQuery } from "@tanstack/react-query";
import ChatSkeleton from "../../Components/Chat/ChatSkeleton";
type Props = {};

const Dashboard = (props: Props) => {
  const fetchChats = async (): Promise<Chats[]> => {
    const result = await GetAllChatsAsync();
    return result?.data ?? [];
  };

  const { data, status, isLoading } = useQuery<Chats[]>({
    queryKey: ["chats"],
    queryFn: fetchChats,
  });
  console.log(data);

  return (
    <div className="grid place-items-center">
      <div className="w-full sm:max-w-[310px] md:max-w-[620px]   lg:max-w-[920px] xl:max-w-[1500px] px-4">
        <ChatsCard chats={data} />
      </div>
    </div>
  );
};

export default Dashboard;
