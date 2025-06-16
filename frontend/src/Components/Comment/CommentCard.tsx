import type { Comments } from "../../Model/Comments";
import CommentItem from "./CommentItem";

interface Props {
  comments: Comments[] | undefined;
}

const CommentCard = ({ comments }: Props) => {
  if (typeof comments === "undefined") {
    return <span className="font-semibold">No Comments</span>;
  }

  return (
    <div>
      {comments.length ? (
        <ul className="list-none">
          {comments?.map((comment, index) => {
            return (
              <li key={`${comment}-${index}`}>
                <CommentItem comment={comment} />
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
