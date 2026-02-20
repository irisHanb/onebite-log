import { togglePostLike } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import type { Post, UseMutationCallback } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useTogglePostLike(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: togglePostLike,
    onMutate: async ({ postId }) => {
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.post.byId(postId),
      });

      const prevPost = queryClient.getQueryData<Post>(
        QUERY_KEYS.post.byId(postId),
      );
      // 낙관적 업데이트 실행
      queryClient.setQueryData<Post>(QUERY_KEYS.post.byId(postId), (post) => {
        if (!post) throw new Error("포스트가 존재하지 않습니다.");
        return {
          ...post,
          isLiked: !post.isLiked,
          like_count: post.isLiked ? post.like_count - 1 : post.like_count + 1,
        };
      });
      // 백업 포스트를 context 로 넘김
      return {
        prevPost,
      };
    },
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error, _, context) => {
      // 에러 발생 시, 낙관적 업데이트 이전 상태로 롤백
      if (context && context.prevPost) {
        queryClient.setQueryData<Post>(
          QUERY_KEYS.post.byId(context.prevPost.id),
          context.prevPost,
        );
      }
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
