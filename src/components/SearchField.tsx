"use client";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";

export default function SearchField() {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const q = (form.q as HTMLInputElement).value.trim();
    if (!q) {
      return;
    }
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="relative">
        <Input name="q" placeholder="Search" className="pe-10"></Input>
        <SearchIcon className="text-muted-foreground absolute top-1/2 right-3 size-5 -translate-y-1/2 transform"></SearchIcon>
      </div>
    </form>
  );
}
