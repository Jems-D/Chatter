import React from "react";
import ChatItem from "../../Components/Chat/ChatItem";
import { GetAllChatsAsync } from "../../Service/ChatService";
import { array } from "yup";
import ChatsCard from "../../Components/Chat/ChatsCard";
import type { Chats } from "../../Model/Chats";
import { useQuery } from "@tanstack/react-query";
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
    <div className="flex justify-items-center">
      <div className="w-full max-w-[1500px] px-4">
        {data?.length ? <ChatsCard chats={data} /> : null}
      </div>
    </div>
  );
};

export default Dashboard;
