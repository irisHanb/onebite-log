import supabase from "@/lib/supabase";
import { getRandomNickname } from "@/lib/utils";
import { deleteImageInPath, uploadImage } from "./image";

export async function fetchProfile(userId: string) {
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;
  return data;
}

export async function creatProfile(userId: string) {
  const { data, error } = await supabase
    .from("profile")
    .insert({
      id: userId,
      nickname: getRandomNickname(),
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateProfile({
  userId,
  avatarImageFile,
  nickname,
  bio,
}: {
  userId: string;
  avatarImageFile?: File;
  nickname?: string;
  bio?: string;
}) {
  // 1. 기존 avater 이미지 삭제
  if (avatarImageFile) {
    await deleteImageInPath(`${userId}/avatar`);
  }

  // 2. 새로운 avatar 이미지 업로드
  let uploadedAvatarUrl: string | undefined;
  if (avatarImageFile) {
    const fileExtension = avatarImageFile.name.split(".").pop() || "webp";
    const filePath = `${userId}/avatar/${new Date().getTime()}-${crypto.randomUUID()}.${fileExtension}`;
    uploadedAvatarUrl = await uploadImage({
      file: avatarImageFile!,
      filePath,
    });
  }

  // 3. 프로필 테이블 업데이트
  const { data, error } = await supabase
    .from("profile")
    .update({
      avatar_url: uploadedAvatarUrl,
      nickname,
      bio,
    })
    .eq("id", userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
