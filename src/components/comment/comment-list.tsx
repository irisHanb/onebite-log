import { useCommentsData } from "@/hooks/queries/use-comments-data";
import CommentItem from "./comment-item";
import Fallback from "../fallback";
import Loader from "../post/loader";
import type { Comment, NestedComment } from "@/types";

function toNestedComments(comments: Comment[]): NestedComment[] {
  const results: NestedComment[] = [];

  comments.forEach((comment) => {
    // root comment 밑으로 다 넣어준다.
    if (comment.root_comment_id) {
      const rootCommentIndex = results.findIndex(
        (item) => item.id === comment.root_comment_id,
      );

      const parentComment = comments.find(
        (item) => item.id === comment.parent_comment_id,
      );

      results[rootCommentIndex].children.push({
        ...comment,
        children: [],
        parentComment,
      });
    } else {
      results.push({ ...comment, children: [] });
    }
  });
  return results;
}

export default function CommentList({ postId }: { postId: number }) {
  const {
    data: comments,
    error: errorFetchComments,
    isPending: isPendingFetchComments,
  } = useCommentsData(postId);

  if (errorFetchComments) return <Fallback />;
  if (isPendingFetchComments) return <Loader />;

  const nestedComments = toNestedComments(comments);

  return (
    <div className="flex flex-col gap-5">
      {nestedComments?.map((comment) => (
        <CommentItem key={comment.id} {...comment} />
      ))}
    </div>
  );
}
