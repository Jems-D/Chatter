import type { Comments } from "../../Model/Comments";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import ChatMenu from "../ChatMenu/ChatMenu";
import type { QueryObserverResult } from "@tanstack/react-query";
import { DeleteCommentAsync } from "../../Service/CommentService";
import { toast } from "react-toastify";

interface Props {
  comment: Comments;
  refetch: () => Promise<QueryObserverResult<Comments[], Error>>;
}

const CommentItem = ({ comment, refetch }: Props) => {
  const onCommentDelete = async () => {
    await DeleteCommentAsync(comment.commentId).then((res) => {
      if (res?.status === 204) {
        toast.success("Comment deleted");
        refetch();
      }
    });
  };

  return (
    <Card className="shadow-none border-0 rounded-0 gap-1 py-3 bg-white dark:bg-[var(--color_appledark)] text-[var(--color_text_white_i) dark:text=[var(--color_text_dark_i)] ">
      <CardHeader className="">
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
            <span className="font-semibold">@{comment.username}</span>
          </div>
          <ChatMenu onDelete={onCommentDelete} userId={comment.createdById} />
        </div>
      </CardHeader>
      <CardContent className="text-left text-pretty break-all">
        {comment.content}
      </CardContent>
    </Card>
  );
};

export default CommentItem;
