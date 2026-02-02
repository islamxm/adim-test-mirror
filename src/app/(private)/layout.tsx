import { PropsWithChildren } from "react";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { AuthProvider } from "@/_app/providers/auth";

export default async function PrivateLayout({ children }: PropsWithChildren) {
  const session = await getServerSession();

  if (!session) {
    redirect("/auth?type=login");
  }

  return <AuthProvider>{children}</AuthProvider>;
}
