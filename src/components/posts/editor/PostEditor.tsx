"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useSession } from "@/app/(main)/SessionProvider";
import UserAvatar from "@/components/UserAvatar";
import "./styles.css";
import { useSubmitPostMutation } from "./mutations";
import LoadingButton from "@/components/LoadingButton";
export default function PostEditor() {
  const { user } = useSession();
  const mutation = useSubmitPostMutation();
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
      }),
      Placeholder.configure({
        placeholder: "What' crack-a-alackin?",
      }),
    ],
    immediatelyRender: false, //Tiptap 默认在 SSR 环境下尝试立即渲染编辑器，但如果没有显式设置 immediatelyRender: false，可能会导致 SSR 和客户端渲染不一致。
  });

  const input =
    editor?.getText({
      blockSeparator: "\n",
    }) || "";

  function onSubmit() {
    mutation.mutate(input, {
      onSuccess: () => {
        editor?.commands.clearContent();
      },
    });
  }
  return (
    <div className="bg-card flex flex-col gap-5 rounded-2xl p-5 shadow-sm">
      <div className="flex gap-5">
        <UserAvatar
          avatarUrl={user.avatarUrl}
          className="hidden sm:inline"
        ></UserAvatar>
        <EditorContent
          editor={editor}
          className="bg-background h-full max-h-[20rem] w-full overflow-y-auto rounded-2xl border-none px-5 py-3"
        ></EditorContent>
      </div>
      <div className="flex justify-end">
        <LoadingButton
          loading={mutation.isPending}
          onClick={onSubmit}
          disabled={!input.trim()}
          className="min-w-20"
        >
          Post
        </LoadingButton>
      </div>
    </div>
  );
}
