import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import SessionProvider from "../(main)/SessionProvider";
import NavBar from "./NavBar";

export default async function Page({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateRequest();
  if (!session.user) {
    redirect("/login");
  }
  return (
    <SessionProvider value={session}>
      <div className="flex min-h-screen flex-col">
        <NavBar></NavBar>
        <div className="mx-auto max-w-7xl p-5">{children}</div>
      </div>
    </SessionProvider>
  );
}
