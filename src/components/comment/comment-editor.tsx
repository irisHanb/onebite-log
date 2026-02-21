import { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useCreateComment } from "@/hooks/mutations/comment/use-create-comment";
import { toast } from "sonner";

export default function CommentEditor({ postId }: { postId: number }) {
  const [content, setContent] = useState("");
  const {
    mutate: createComment,
    isPending: isPendingCreateComment,
    error: errorCreateComment,
  } = useCreateComment({
    onSuccess: () => {
      setContent("");
    },
    onError: (error) => {
      toast.error("댓글 작성에 실패했습니다.", {
        position: "top-center",
      });
    },
  });

  const handleSubmitClick = () => {
    if (content.trim() === "") return;
    createComment({ postId, content });
  };

  return (
    <div className="flex flex-col gap-2">
      <Textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <div className="flex justify-end">
        <Button onClick={handleSubmitClick}>작성</Button>
      </div>
    </div>
  );
}
