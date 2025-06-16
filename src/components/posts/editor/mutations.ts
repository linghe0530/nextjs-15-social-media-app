import { toast } from "@/components/ui/sonner";
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { submitPost } from "./action";
import { PostPage } from "@/lib/types";

export function useSubmitPostMutation() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: submitPost,
    onSuccess: async (newPost) => {
      const queryFilters: QueryFilters = { queryKey: ["post-feed", "for-you"] };
      await queryClient.cancelQueries(queryFilters);
      queryClient.setQueriesData<InfiniteData<PostPage, string | null>>(
        queryFilters,
        (oldData) => {
          console.log(oldData);

          const firstPage = oldData?.pages[0];
          if (firstPage) {
            return {
              pageParams: oldData.pageParams,
              pages: [
                {
                  posts: [newPost, ...firstPage.posts],
                  nextCursor: firstPage.nextCursor,
                },
                ...oldData.pages.slice(1),
              ],
            };
          }
        },
      );
      queryClient.invalidateQueries({
        queryKey: queryFilters.queryKey,
        predicate(query) {
          return !query.state.data;
        },
      });
      toast.success("post created!");
    },
    onError(error) {
      console.error(error);
      toast.error("Failed to create post.Please try again!");
    },
  });
  return mutation;
}
