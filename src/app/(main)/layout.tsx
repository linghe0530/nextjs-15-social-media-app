import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import SessionProvider from "../(main)/SessionProvider";
import NavBar from "./NavBar";
import MenuBar from "./MenuBar";

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
        <div className="mx-auto flex w-full max-w-7xl grow gap-5 p-5">
          <MenuBar className="bg-card sticky top-[5.25rem] hidden h-fit flex-none space-y-3 rounded-2xl px-3 py-5 shadow-sm sm:block lg:px-5 xl:w-80"></MenuBar>
          {children}
        </div>
        <MenuBar className="bg-card sticky bottom-0 flex w-full justify-center gap-5 border-t p-3 sm:hidden"></MenuBar>
      </div>
    </SessionProvider>
  );
}
