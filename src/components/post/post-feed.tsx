import Fallback from "../fallback";
import Loader from "./loader";
import PostItem from "./post-item";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useInfinitePostData } from "@/hooks/queries/use-infinite-post-data";

export default function PostFeed({ authorId }: { authorId?: string }) {
  const { data, error, isPending, fetchNextPage, isFetchingNextPage } =
    useInfinitePostData(authorId);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  if (error) return <Fallback />;
  if (isPending) return <Loader />;

  return (
    <div className="flex flex-col gap-10">
      {data.pages.map((page) =>
        page.map((postId) => <PostItem key={postId} postId={postId} />),
      )}
      {isFetchingNextPage && <Loader />}
      <div ref={ref}></div>
    </div>
  );
}
