import AlertModal from "@/components/modal/alert-modal";
import PostEditorModal from "@/components/modal/post-editor-modal";
import ProfileEditorModal from "@/components/modal/profile-editor-modal";
import { createPortal } from "react-dom";

export default function ModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {createPortal(
        <>
          <PostEditorModal />
          <AlertModal />
          <ProfileEditorModal />
        </>,
        document.getElementById("modal-root")!,
      )}
      {children}
    </>
  );
}
