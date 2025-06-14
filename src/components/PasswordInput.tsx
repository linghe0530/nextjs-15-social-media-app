import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

function PasswordInput({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        className={cn("pe-10", className)}
        {...props}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        title={showPassword ? "Hide password" : "Show password"}
        className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2"
      >
        {showPassword ? (
          <EyeOff className="size-5"></EyeOff>
        ) : (
          <Eye className="size-5"></Eye>
        )}
      </button>
    </div>
  );
}

export { PasswordInput };
