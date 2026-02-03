import "next-auth";
import { redirect } from "next/navigation";

import { authConfig } from "@/entities/user";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await authConfig.auth();

  if (session?.accessToken) {
    redirect("/profile");
  }

  return <>{children}</>;
}
