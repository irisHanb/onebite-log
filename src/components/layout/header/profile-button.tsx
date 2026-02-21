import { useSession } from "@/store/session";
import defaultAvatar from "@/assets/default-avatar.png";
import { useProfileData } from "@/hooks/queries/use-profile-data";
import Fallback from "@/components/fallback";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { Link } from "react-router";
import { signOut } from "@/api/auth";

export default function ProfileButton() {
  const session = useSession();
  const { data: profile, error, isFetching } = useProfileData(session?.user.id);

  if (!session) return null;
  if (isFetching)
    return <div className="bg-muted h-8 w-8 animate-pulse rounded-full" />;
  if (error) return <Fallback />;

  return (
    <Popover>
      <PopoverTrigger>
        <img
          className="h-6 w-6 cursor-pointer rounded-full object-cover"
          src={profile?.avatar_url || defaultAvatar}
          alt={"사용자의 프로필 사진"}
        />
      </PopoverTrigger>
      <PopoverContent className="flex w-40 flex-col p-0">
        <PopoverClose asChild>
          <Link to={`/profile/${session.user.id}`}>
            <div className="hover:bg-muted cursor-pointer px-4 py-3 text-sm">
              프로필
            </div>
          </Link>
        </PopoverClose>
        <PopoverClose asChild>
          <div
            className="hover:bg-muted cursor-pointer px-4 py-3 text-sm"
            onClick={signOut}
          >
            로그아웃
          </div>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
}
