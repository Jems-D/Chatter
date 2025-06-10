import React, { Suspense, useState } from "react";
import ChatItem from "../../Components/Chat/ChatItem";
import { CreateChatAsync, GetAllChatsAsync } from "../../Service/ChatService";
import { array } from "yup";
import ChatsCard from "../../Components/Chat/ChatsCard";
import type { Chats } from "../../Model/Chats";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ChatSkeleton from "../../Components/Chat/ChatSkeleton";
import { Dialog } from "@radix-ui/react-dialog";
import CreateChat from "../../Components/FormChat/CreateChat";
import { ToastContainer } from "react-toastify";
import type { ChatForm } from "../../Model/Forms";
type Props = {};

const Dashboard = (props: Props) => {
  const fetchChats = async (): Promise<Chats[]> => {
    const result = await GetAllChatsAsync();
    return result?.data ?? [];
  };

  const createChat = async (form: ChatForm) => {
    return await CreateChatAsync(form.chatTitle, form.chatContent);
  };

  const { data, status, isLoading } = useQuery<Chats[]>({
    queryKey: ["chats"],
    queryFn: fetchChats,
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createChat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
  });

  return (
    <div className="grid place-items-center">
      <div className="w-full sm:max-w-[310px] md:max-w-[620px]   lg:max-w-[920px] xl:max-w-[1500px] px-4">
        <ChatsCard chats={data} />
      </div>
      <div className="fixed bottom-10 right-3 sm:right-15 md:right-3 lg:right-5 xl:right-5 2xl:right-50 block z-10">
        <CreateChat onSubmit={mutation.mutateAsync} />
        <ToastContainer />
      </div>
    </div>
  );
};

export default Dashboard;
