import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { deletePost } from "./action";
import { PostPage } from "@/lib/types";

export default function useDeletePostMutation() {
  const queryClient = useQueryClient();

  const router = useRouter();

  const pathname = usePathname();
  const mutation = useMutation({
    mutationFn: deletePost,
    onSuccess: async (deletedPost) => {
      const queryFilters: QueryFilters = { queryKey: ["post-feed", "for-you"] };
      await queryClient.cancelQueries(queryFilters);
      queryClient.setQueriesData<InfiniteData<PostPage, string | null>>(
        queryFilters,
        (oldData) => {
          if (!oldData) return;
          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              nextCursor: page.nextCursor,
              posts: page.posts.filter((p) => p.id !== deletedPost.id),
            })),
          };
        },
      );

      toast.success("Post deleted!");

      if (pathname === `/posts/${deletedPost.id}`) {
        router.push(`/users/${deletedPost.user.username}`);
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to delete post.Please try again!");
    },
  });
  return mutation;
}
