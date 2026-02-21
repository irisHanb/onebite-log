import Loader from "@/components/post/loader";
import { useProfileData } from "@/hooks/queries/use-profile-data";
import defaultAvatar from "@/assets/default-avatar.png";
import Fallback from "@/components/fallback";

export default function ProfileInfo({ userId }: { userId: string }) {
  const {
    data: user,
    error: errorFetchProfile,
    isPending: isPendingFetchProfile,
  } = useProfileData(userId);

  if (errorFetchProfile) return <Fallback />;
  if (isPendingFetchProfile) return <Loader />;

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <img
        src={user.avatar_url || defaultAvatar}
        alt="Profile Avatar"
        className="h-30 w-30 rounded-full object-cover"
      />
      <div className="flex flex-col items-center gap-2">
        <div className="text-xl font-bold">{user.nickname}</div>
        <div className="text-muted-foreground">{user.bio}</div>
      </div>
    </div>
  );
}
