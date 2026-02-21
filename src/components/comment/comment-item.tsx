import { Link } from "react-router";
import defaultAvatar from "@/assets/default-avatar.png";
import type { Comment } from "@/types";
import { foramtTimeAgo } from "@/lib/time";

export default function CommentItem(comment: Comment) {
  const { content, author, created_at } = comment;

  return (
    <div className={`flex flex-col gap-8 border-b pb-5`}>
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
          <div>{content}</div>
          <div className="text-muted-foreground flex justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="cursor-pointer hover:underline">댓글</div>
              <div className="bg-border h-[13px] w-[2px]"></div>
              <div>{foramtTimeAgo(created_at)}</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="cursor-pointer hover:underline">수정</div>
              <div className="bg-border h-[13px] w-[2px]"></div>
              <div className="cursor-pointer hover:underline">삭제</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
