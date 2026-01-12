import { PropsWithChildren } from "react";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function PrivateLayout({ children }: PropsWithChildren) {
  const session = await getServerSession();
  if (!session) {
    redirect("/auth");
  }
  return <>{children}</>;
}
