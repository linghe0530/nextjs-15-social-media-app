import PostEditor from "@/components/posts/editor/PostEditor";

import TrendsSiderBar from "@/components/TrendsSideBar";
import ForYouFeed from "./ForYouFeed";

export default function Home() {
  return (
    <main className="bg-red-5 flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
        <ForYouFeed />
      </div>
      <TrendsSiderBar />
    </main>
  );
}
