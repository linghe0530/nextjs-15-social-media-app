import { PostData } from "@/lib/types";
import { useState } from "react";
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import DeletePostDialog from "./DeletePostDialog";

interface PostMoreButtionProps {
  post: PostData;
  className?: string;
}

export default function PostMoreButtion({
  post,
  className,
}: PostMoreButtionProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant={"ghost"} className={className}>
            <MoreHorizontal className="text-muted-foreground size-5"></MoreHorizontal>
          </Button>
        </DropdownMenuTrigger>
      </DropdownMenu>
      <DeletePostDialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        post={post}
      />
    </>
  );
}
