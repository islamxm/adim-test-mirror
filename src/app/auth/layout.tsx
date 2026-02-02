import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getAuthOptions } from "@/entities/user";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(getAuthOptions(cookies));

  if (session?.accessToken) {
    redirect("/profile");
  }
  return <>{children}</>;
}
