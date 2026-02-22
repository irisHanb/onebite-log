import { useCommentsData } from "@/hooks/queries/use-comments-data";
import CommentItem from "./comment-item";
import Fallback from "../fallback";
import Loader from "../post/loader";
import type { Comment, NestedComment } from "@/types";

function toNestedComments(comments: Comment[]): NestedComment[] {
  const results: NestedComment[] = [];

  comments.forEach((comment) => {
    if (comment.parent_comment_id) {
      // 대댓글, 즉, 이미 있는 댓글의 대댓글 이므로 results 리스트에서 찾으면 된다.
      const parentCommentIndex = results.findIndex(
        (item) => item.id === comment.parent_comment_id,
      );

      // 결과값의 parent 에 현재 comment 를 children 으로 넣어준다.
      results[parentCommentIndex].children.push({
        ...comment,
        children: [],
        parentComment: results[parentCommentIndex],
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
