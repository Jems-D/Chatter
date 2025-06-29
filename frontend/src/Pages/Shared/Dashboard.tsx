import { CreateChatAsync, GetAllChatsAsync } from "../../Service/ChatService";
import ChatsCard from "../../Components/Chat/ChatsCard";
import type { Chats } from "../../Model/Chats";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CreateChat from "../../Components/FormChat/CreateChat";
import type { ChatForm } from "../../Model/Forms";

const Dashboard = () => {
  const fetchChats = async (): Promise<Chats[]> => {
    const result = await GetAllChatsAsync();
    return result?.data ?? [];
  };

  const createChat = async (form: ChatForm) => {
    return await CreateChatAsync(form.chatTitle, form.chatContent);
  };

  const { data, refetch } = useQuery<Chats[]>({
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
        <ChatsCard chats={data} refetch={refetch} />
      </div>
      <div className="fixed bottom-10 right-3 sm:right-15 md:right-3 lg:right-5 xl:right-5 2xl:right-50 block z-10">
        <CreateChat onSubmit={mutation.mutateAsync} />
      </div>
    </div>
  );
};

export default Dashboard;
