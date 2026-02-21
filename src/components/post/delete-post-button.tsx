import { useDeletePost } from "@/hooks/mutations/post/use-delete-post";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useOpenAlertModal } from "@/store/alert-modal";
import { useNavigate } from "react-router";

export default function DeletePostButton({ id }: { id: number }) {
  const openAlertModal = useOpenAlertModal();
  const navigate = useNavigate();
  const { mutate: deletePost, isPending: isPendingDeletePost } = useDeletePost({
    onSuccess: () => {
      const pathname = window.location.pathname;
      if (pathname.startsWith(`/post/${id}`)) {
        navigate("/", { replace: true });
      }
    },
    onError: (error) => {
      toast.error("게시물 삭제에 실패했습니다.", {
        position: "top-center",
      });
    },
  });

  const handleDeleteClick = () => {
    openAlertModal({
      title: "게시물 삭제",
      description:
        "정말로 이 게시물을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.",
      onPositive: () => {
        deletePost(id);
      },
    });
  };
  return (
    <Button
      className="cursor-pointer"
      variant={"ghost"}
      onClick={handleDeleteClick}
      disabled={isPendingDeletePost}
    >
      삭제
    </Button>
  );
}
