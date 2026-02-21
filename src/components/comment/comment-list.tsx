import { useCommentsData } from "@/hooks/queries/use-comments-data";
import CommentItem from "./comment-item";
import Fallback from "../fallback";
import Loader from "../post/loader";

export default function CommentList({ postId }: { postId: number }) {
  const {
    data: comments,
    error: errorFetchComments,
    isPending: isPendingFetchComments,
  } = useCommentsData(postId);

  if (errorFetchComments) return <Fallback />;
  if (isPendingFetchComments) return <Loader />;

  return (
    <div className="flex flex-col gap-5">
      {comments?.map((comment) => (
        <CommentItem key={comment.id} {...comment} />
      ))}
    </div>
  );
}
