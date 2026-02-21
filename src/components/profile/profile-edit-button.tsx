import { useProfileEditorModalOpen } from "@/store/profile-editor-modal";
import { Button } from "../ui/button";

export default function ProfileEditButton() {
  const openProfileEditorModal = useProfileEditorModalOpen();

  return (
    <Button
      variant="secondary"
      className="cursor-pointer"
      onClick={openProfileEditorModal}
    >
      프로필 수정
    </Button>
  );
}
