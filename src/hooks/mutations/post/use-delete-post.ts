import { deleteImageInPath } from "@/api/image";
import { deletePost } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import type { UseMutationCallback } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeletePost = (callbacks?: UseMutationCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: async (deletedPost) => {
      if (callbacks?.onSuccess) {
        callbacks.onSuccess();
      }
      if (deletedPost.image_urls && deletedPost.image_urls.length > 0) {
        await deleteImageInPath(`${deletedPost.author_id}/${deletedPost.id}`); // 게시글과 연관된 이미지 삭제
      }

      queryClient.resetQueries({
        queryKey: QUERY_KEYS.post.list,
      });
    },
    onError: (error) => {
      if (callbacks?.onError) {
        callbacks.onError(error);
      }
    },
  });
};
