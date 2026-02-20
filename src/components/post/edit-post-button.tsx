import { useOpenEditPostModal } from "@/store/post-editor-modal";
import { Button } from "../ui/button";
import type { PostEntity } from "@/types";

export default function EditPostButton(param: PostEntity) {
  const openEditPostModal = useOpenEditPostModal();

  const handleButtonclick = () => {
    openEditPostModal({
      postId: param.id,
      content: param.content,
      imageUrls: param.image_urls,
    });
  };

  return (
    <Button
      className="cursor-pointer"
      variant={"ghost"}
      onClick={handleButtonclick}
    >
      수정
    </Button>
  );
}
