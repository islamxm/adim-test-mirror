import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

export async function POST(req: NextRequest) {
  const deviceInfo = await req.json();
  const refreshToken = req.cookies.get("refresh_token")?.value;
  const forbidden = [
    "content-length",
    "host",
    "connection",
    "transfer-encoding",
    "accept-encoding",
  ];

  const safeHeaders = Object.fromEntries(
    [...req.headers].filter(([key]) => !forbidden.includes(key.toLowerCase())),
  );
  const refreshRes = await fetch(`${API_URL}users/generate_token`, {
    method: "POST",
    headers: {
      ...safeHeaders,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // надо проверить наличие
      token: refreshToken,
      deviceInfo,
    }),
  });
  console.log(refreshRes);
  console.log(refreshToken);
  const body = await refreshRes.json();
  console.log(body);
  if (!refreshRes.ok) {
    return NextResponse.json(body, { status: refreshRes.status });
  } else {
    const response = NextResponse.json(
      { accessToken: body?.accessToken },
      { status: refreshRes.status },
    );
    response.cookies.set("refresh_token", body?.refreshToken, {
      httpOnly: true,
    });
    return response;
  }
}
