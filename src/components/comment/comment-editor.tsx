import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useCreateComment } from "@/hooks/mutations/comment/use-create-comment";
import { toast } from "sonner";
import { useUpdateComment } from "@/hooks/mutations/comment/use-update-comment";

type CreateMode = {
  type: "CREATE";
  postId: number;
};

type EditMode = {
  type: "EDIT";
  commentId: number;
  initialContent: string;
  onClose: () => void;
};

type ReplyMode = {
  type: "REPLY";
  postId: number;
  parentCommentId: number;
  rootCommentId: number;
  onClose: () => void;
};

type Props = CreateMode | EditMode | ReplyMode;

export default function CommentEditor(props: Props) {
  const [content, setContent] = useState("");

  const {
    mutate: createComment,
    isPending: isPendingCreateComment,
    error: errorCreateComment,
  } = useCreateComment({
    onSuccess: () => {
      setContent("");
      if (props.type === "REPLY") props.onClose();
    },
    onError: (error) => {
      toast.error("댓글 작성에 실패했습니다.", {
        position: "top-center",
      });
    },
  });

  const { mutate: updateComment, isPending: isPendingUpdateComment } =
    useUpdateComment({
      onSuccess: () => {
        (props as EditMode).onClose();
      },
      onError: (error) => {
        toast.error("댓글 수정에 실패했습니다.", {
          position: "top-center",
        });
      },
    });

  const handleSubmitClick = () => {
    if (content.trim() === "") return;

    if (props.type === "CREATE") {
      createComment({ postId: props.postId, content });
    } else if (props.type === "REPLY") {
      createComment({
        postId: props.postId,
        content,
        parentCommentId: props.parentCommentId,
        rootCommentId: props.rootCommentId,
      });
    } else {
      updateComment({ id: props.commentId, content });
    }
  };

  const isPending = isPendingCreateComment || isPendingUpdateComment;

  useEffect(() => {
    if (props.type === "EDIT") {
      setContent(props.initialContent);
    }
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={isPending}
      />
      <div className="flex justify-end gap-2">
        {props.type === "EDIT" ||
          (props.type === "REPLY" && (
            <Button
              variant="outline"
              onClick={() => props.onClose()}
              disabled={isPending}
            >
              취소
            </Button>
          ))}
        <Button onClick={handleSubmitClick} disabled={isPending}>
          작성
        </Button>
      </div>
    </div>
  );
}
