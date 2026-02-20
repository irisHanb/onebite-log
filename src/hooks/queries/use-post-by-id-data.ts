import { fetchPostById } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

export const usePostByIdData = ({
  postId,
  type,
}: {
  postId: number;
  type: "FEED" | "DETAIL";
}) => {
  return useQuery({
    queryKey: QUERY_KEYS.post.byId(postId),
    queryFn: () => fetchPostById(postId),
    enabled: type === "FEED" ? false : true, // false면 캐싱데이터만 사용하는 것
  });
};
