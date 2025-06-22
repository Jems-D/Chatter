import { Suspense } from "react";
import type { Comments } from "../../Model/Comments";
import CommentItem from "./CommentItem";
import CommentSkeleton from "./CommentSkeleton";
import type { QueryObserverResult } from "@tanstack/react-query";

interface Props {
  comments: Comments[] | undefined;
  refetch: () => Promise<QueryObserverResult<Comments[], Error>>;
}

const CommentCard = ({ comments, refetch }: Props) => {
  if (typeof comments === "undefined") {
    return <span className="font-semibold">No Comments</span>;
  }

  if (!Array.isArray(comments)) {
    return <span className="font-semibold">No Comments</span>;
  }

  return (
    <div>
      {comments.length ? (
        <ul className="list-none">
          {comments?.map((comment, index) => {
            return (
              <li key={`${comment}-${index}-12${index}`}>
                <Suspense fallback={<CommentSkeleton />}>
                  <CommentItem comment={comment} refetch={refetch} />
                </Suspense>
              </li>
            );
          })}
        </ul>
      ) : (
        <span>No comments</span>
      )}
    </div>
  );
};

export default CommentCard;
