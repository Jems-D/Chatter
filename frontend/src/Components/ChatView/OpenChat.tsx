import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { MessageCircle, X } from "lucide-react";
import { DialogFooter, DialogHeader } from "../ui/dialog";
import * as Yup from "yup";
import ChatItem from "../Chat/ChatItem";
import { useQuery, type QueryObserverResult } from "@tanstack/react-query";
import type { Chats } from "../../Model/Chats";
import CommentCard from "../Comment/CommentCard";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../ui/input";
import {
  CreateCommentAsync,
  GetAllCommentsAsync,
} from "../../Service/CommentService";
import { toast } from "react-toastify";
import { Textarea } from "../ui/textarea";
import type { Comments } from "../../Model/Comments";

interface Props {
  chat: Chats;
}

interface CommentForm {
  content: string;
}

const validations = Yup.object({
  content: Yup.string()
    .required()
    .min(10, "Content too short")
    .max(200, "Content too long"),
});

const OpenChat = ({ chat }: Props) => {
  const [isChatOpen, setChatOpen] = useState<boolean>(false);

  const fecthComments = async () => {
    const result = await GetAllCommentsAsync(chat.id);
    return result?.data ?? [];
  };

  const { data, status, isLoading, refetch } = useQuery<Comments[]>({
    queryKey: ["comments"],
    queryFn: fecthComments,
    enabled: isChatOpen,
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentForm>({ resolver: yupResolver(validations) });

  const onSubmit = async (e: CommentForm) => {
    CreateCommentAsync(chat.id, e.content)
      .then((res) => {
        if (res?.status === 200) {
          toast.success("Comment Added");
          reset();
          refetch();
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <Dialog open={isChatOpen} onOpenChange={setChatOpen}>
      <DialogTrigger asChild className="!shadow-0 !border-0 !rounded-0">
        <Button
          variant="ghost"
          className=" hover:!text-blue-500 hover:bg-[var(--color_applewhite) dark:hover:bg-[var(--color)] bg-[var(--color_applewhite)] dark:bg-[var(--color_appledark)] cursor-pointer shadow-0"
        >
          <MessageCircle strokeWidth={1} />
        </Button>
      </DialogTrigger>
      <DialogContent className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-4xl w-[80vw] h-[80vh] p-0 bg-white rounded-2xl flex flex-col dark:bg-[var(--color_appledark)] text-[var(--color_text_white_i) dark:text=[var(--color_text_dark_i)]">
        <DialogHeader className="p-4">
          <DialogTitle hidden></DialogTitle>
          <DialogDescription hidden></DialogDescription>
          <DialogClose asChild>
            <Button variant="ghost" size="icon" className="hover:text-red-500">
              <X strokeWidth={1} />
            </Button>
          </DialogClose>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col">
          {/* the post itself */}
          <div className="border-b border-gray-200">
            <ChatItem
              chat={chat}
              refetch={function (): Promise<
                QueryObserverResult<Chats[], unknown>
              > {
                throw new Error("Function not implemented.");
              }}
              isOpen={true}
            />
          </div>

          {/* Middle: Comments (scrollable) */}
          <div className="flex-1 overflow-y-auto p-4 border-b border-gray-200">
            <span className="font-semibold block mb-2">Comments</span>
            <CommentCard comments={data} />
          </div>

          {/* creating new comment */}
          <div className="p-5 border-t border-gray-200">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className=" flex flex-row">
                <div className="flex-col flex-1">
                  <Textarea
                    placeholder="Add a comment"
                    {...register("content")}
                    className="w-full"
                  />
                  {errors.content?.message && (
                    <span className="text-xs text-red-600 text-right dark:text-red-400">
                      {errors.content.message}
                    </span>
                  )}
                </div>
                <button type="submit" className="ms-3 cursor-pointer">
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OpenChat;
