import { Link } from "react-router";
import defaultAvatar from "@/assets/default-avatar.png";
import type { NestedComment } from "@/types";
import { foramtTimeAgo } from "@/lib/time";
import { useSession } from "@/store/session";
import { useState } from "react";
import CommentEditor from "./comment-editor";
import { useDeleteComment } from "@/hooks/mutations/comment/use-delete-comment";
import { toast } from "sonner";
import { useOpenAlertModal } from "@/store/alert-modal";

export default function CommentItem(comment: NestedComment) {
  const {
    id,
    content,
    author,
    created_at,
    post_id: postId,
    children,
  } = comment;
  const [isEditing, setIsEditing] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const openAlertModal = useOpenAlertModal();

  const session = useSession();

  const { mutate: deleteComment, isPending: isPendingDeleteComment } =
    useDeleteComment({
      onError: (error) => {
        toast.error("댓글 삭제에 실패했습니다.", { position: "top-center" });
      },
    });

  const toggleIsEditing = () => {
    setIsEditing(!isEditing);
  };
  const toggleIsReply = () => {
    setIsReply(!isReply);
  };

  const handleDeleteClick = () => {
    openAlertModal({
      title: "댓글 삭제",
      description:
        "삭제된 댓글은 되돌릴 수 없습니다. 정말 이 댓글을 삭제하시겠습니까?",
      onPositive: () => deleteComment(id),
    });
  };

  const isMine = session?.user.id === author.id;
  const isRootComment = comment.parentComment === undefined;

  return (
    <div
      className={`flex flex-col gap-8 pb-5 ${isRootComment ? "border-b" : "ml-10"}`}
    >
      <div className="flex items-start gap-4">
        <Link to="#">
          <div className="flex h-full flex-col">
            <img
              src={author.avatar_url || defaultAvatar}
              alt="프로필 이미지"
              className="h-10 w-10 rounded-full object-cover"
            />
          </div>
        </Link>
        <div className="flex w-full flex-col gap-2">
          <div className="font-bold">{author.nickname}</div>
          {isEditing ? (
            <CommentEditor
              type="EDIT"
              commentId={id}
              initialContent={content}
              onClose={toggleIsEditing}
            />
          ) : (
            <div>{content}</div>
          )}

          <div className="text-muted-foreground flex justify-between text-sm">
            <div className="flex items-center gap-2">
              <div
                className="cursor-pointer hover:underline"
                onClick={toggleIsReply}
              >
                댓글
              </div>
              <div className="bg-border h-[13px] w-[2px]"></div>
              <div>{foramtTimeAgo(created_at)}</div>
            </div>

            <div className="flex items-center gap-2">
              {isMine && (
                <>
                  <div
                    className="cursor-pointer hover:underline"
                    onClick={toggleIsEditing}
                  >
                    수정
                  </div>
                  <div className="bg-border h-[13px] w-[2px]"></div>
                  <div
                    className="cursor-pointer hover:underline"
                    onClick={handleDeleteClick}
                  >
                    삭제
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {isReply && (
        <CommentEditor
          type="REPLY"
          postId={postId}
          parentCommentId={id}
          onClose={toggleIsReply}
        />
      )}
      {children.length > 0 &&
        children.map((comment) => (
          <CommentItem key={comment.id} {...comment} />
        ))}
    </div>
  );
}
