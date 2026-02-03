import { PropsWithChildren } from "react";

import { redirect } from "next/navigation";

import { AuthProvider } from "@/_app/providers/auth";

import { authConfig } from "@/entities/user";

export default async function PrivateLayout({ children }: PropsWithChildren) {
  const session = await authConfig.auth();

  if (!session) {
    redirect("/auth?type=login");
  }

  return <AuthProvider>{children}</AuthProvider>;
}
