import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";

//登录状态访问不允许访问登录注册界面
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();

  if (user) redirect("/");

  return <>{children}</>;
}
