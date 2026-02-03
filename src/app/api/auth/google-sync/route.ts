import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { authConfig } from "@/entities/user";

export async function POST() {
  const session = await authConfig.auth();
  const rawDeviceInfo = (await cookies()).get("deviceInfo")?.value;
  const deviceInfo = rawDeviceInfo ? JSON.parse(rawDeviceInfo) : null;
  const googleIdToken = (session as any)?.id_token;

  if (!googleIdToken || !deviceInfo) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}users/google_sign_in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: googleIdToken,
      deviceInfo,
    }),
  });

  const tokens = await res.json();
  return NextResponse.json(tokens);
}
