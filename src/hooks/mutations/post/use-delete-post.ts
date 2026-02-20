import { deleteImageInPath } from "@/api/image";
import { deletePost } from "@/api/post";
import type { UseMutationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useDeletePost = (callbacks?: UseMutationCallback) => {
  return useMutation({
    mutationFn: deletePost,
    onSuccess: async (deletedPost) => {
      if (callbacks?.onSuccess) {
        callbacks.onSuccess();
      }
      if (deletedPost.image_urls && deletedPost.image_urls.length > 0) {
        await deleteImageInPath(`${deletedPost.author_id}/${deletedPost.id}`); // 게시글과 연관된 이미지 삭제
      }
    },
    onError: (error) => {
      if (callbacks?.onError) {
        callbacks.onError(error);
      }
    },
  });
};
