import { useProfileData } from "@/hooks/queries/use-profile-data";
import { useSession } from "@/store/session";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import Fallback from "../fallback";
import Loader from "../post/loader";
import defaultAvatar from "@/assets/default-avatar.png";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useProfileEditorModal } from "@/store/profile-editor-modal";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { useUpdateProfile } from "@/hooks/mutations/profile/use-update-profile";
import { toast } from "sonner";

type Image = {
  file: File;
  previewUrl: string;
};

export default function ProfileEditorModal() {
  const session = useSession();
  const {
    data: profile,
    isPending: isPendingFetchProfile,
    error: erorFetchProfile,
  } = useProfileData(session?.user.id);

  const store = useProfileEditorModal();
  const {
    isOpen,
    actions: { close },
  } = store;

  const [avatarImage, setAvatarImage] = useState<Image | null>(null);
  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    if (avatarImage) URL.revokeObjectURL(avatarImage.previewUrl);

    setAvatarImage({ file, previewUrl: URL.createObjectURL(file) });
  };

  const handleUpdateClick = () => {
    if (nickname.trim() === "") return;
    updateProfile({
      userId: session!.user.id,
      avatarImageFile: avatarImage?.file,
      nickname,
      bio,
    });
  };

  const { mutate: updateProfile, isPending: isPendingUpdateProfile } =
    useUpdateProfile({
      onSuccess: () => {
        close();
      },
      onError: (error) => {
        toast.error("프로필 수정에 실패했습니다.", {
          position: "top-center",
        });
      },
    });

  useEffect(() => {
    if (!isOpen && avatarImage) {
      URL.revokeObjectURL(avatarImage.previewUrl);
      setAvatarImage(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && profile) {
      setAvatarImage(null);
      setNickname(profile.nickname);
      setBio(profile.bio || "");
    }
  }, [isOpen, profile]);

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogTitle>프로필 수정하기</DialogTitle>
        {erorFetchProfile && <Fallback />}
        {isPendingFetchProfile && <Loader />}
        {!erorFetchProfile && !isPendingFetchProfile && (
          <>
            <div className="flex flex-col gap-2">
              <div className="text-muted-foreground">프로필 이미지</div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
                disabled={isPendingUpdateProfile}
              />
              <img
                src={
                  avatarImage?.previewUrl || profile.avatar_url || defaultAvatar
                }
                alt="Profile Avatar"
                className="h-20 w-20 cursor-pointer rounded-full object-cover"
                onClick={() => {
                  if (fileInputRef?.current) fileInputRef.current.click();
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-muted-foreground">닉네임</div>
              <Input
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                disabled={isPendingUpdateProfile}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-muted-foreground">소개</div>
              <Input
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                disabled={isPendingUpdateProfile}
              />
            </div>
            <Button
              className="cursor-pointer"
              onClick={handleUpdateClick}
              disabled={isPendingUpdateProfile}
            >
              수정하기
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
