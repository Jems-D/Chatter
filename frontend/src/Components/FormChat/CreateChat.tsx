import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import * as Yup from "yup";
import { ChartColumn, Pen } from "lucide-react";
import { useForm } from "react-hook-form";
import type { ChatForm } from "../../Model/Forms";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import type { Chats } from "../../Model/Chats";
import { CreateChatAsync } from "../../Service/ChatService";
import { Bounce, toast } from "react-toastify";
const validations = Yup.object({
  chatTitle: Yup.string()
    .required("Title is required")
    .min(10, "Title too short")
    .max(100, "Title too long"),
  chatContent: Yup.string()
    .required("Content is required")
    .min(50, "Content too short")
    .max(500, "Content too long"),
});

interface Props {
  onSubmit: (form: ChatForm) => Promise<any>;
}

const CreateChat = ({ onSubmit }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const isDarkMode = document.documentElement.classList.contains("dark");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChatForm>({ resolver: yupResolver(validations) });

  const onChatCreated = async (form: ChatForm) => {
    await onSubmit(form).then((res) => {
      if (res.status === 200) {
        toast.success("Created", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: isDarkMode ? "dark" : "colored",
          transition: Bounce,
          closeButton: true,
        });
        setOpen(false);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="w-[50px] h-[50px] rounded-3xl">
        <Button
          variant="outline"
          className="!bg-[var(--color_twitterblue)] !p-10 cursor-pointer"
        >
          <Pen className="!h-[30px] !w-[30px] text-[var(--color_applewhite)]" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onChatCreated)}>
          <DialogHeader>
            <DialogTitle>Add chatter</DialogTitle>
            <DialogDescription>
              Add title and content and say whatever you want, some will listen,
              some will don't.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title-1">Title</Label>
              <Input id="title-1" defaultValue="" {...register("chatTitle")} />
              {errors?.chatTitle?.message && (
                <span className=" mb-2 text-xs text-red-600 text-right dark:text-red-400">
                  {errors.chatTitle.message}
                </span>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="content-1">Content</Label>
              <Textarea
                id="content-1"
                defaultValue=""
                className="h-40"
                {...register("chatContent")}
              />
              {errors.chatContent?.message && (
                <span className="mb-2 text-xs text-red-600 text-right dark:text-red-400">
                  {errors.chatContent.message}
                </span>
              )}
            </div>
          </div>
          <DialogFooter className="mt-5">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Create chat</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChat;
