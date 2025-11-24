import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { JWT } from "next-auth/jwt";
import { cookies } from "next/headers";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth",
    error: "/auth",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }): Promise<JWT> {
      if (account && user) {
        try {
          const ck = await cookies();
          const deviceInfo = JSON.parse(ck.get("deviceInfo")?.value || "");

          const body = {
            token: account.id_token,
            deviceInfo,
          };

          const res = await fetch(
            "http://193.47.42.164:13000/api/v1/users/google_sign_in",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
            }
          );
          if (!res.ok) {
            throw new Error("BackendAuthFailed");
          }
          const data = await res.json();
          token.accessToken = data.data.accessToken;
          token.refreshToken = data.data.refreshToken;
          token.userId = data.data.userId;
          token.deviceId = data.data.deviceId;

          token.accessTokenExpires = Date.now() + 1000 * 60 * 15;
          return token;
        } catch (err) {
          throw err;
        }
      }

      if (Date.now() > (token.accessTokenExpires as number)) {
        console.log("🔄 Refreshing token...");
        return await refreshBackendToken(token);
      }

      return token;
    },

    async session({ session, token }) {
      // @ts-ignore
      session.user.id = token.userId;
      (session as any).accessToken = token.accessToken;
      (session as any).refreshToken = token.refreshToken;
      return session;
    },
  },
});

async function refreshBackendToken(token: JWT): Promise<JWT> {
  try {
    const res = await fetch(
      "http://193.47.42.164:13000/api/v1/users/generate_token",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: token.refreshToken,
          deviceId: token.deviceId,
        }),
      }
    );

    const data = await res.json();

    token.accessToken = data.data.accessToken;
    token.refreshToken = data.data.refreshToken;
    token.accessTokenExpires = Date.now() + 1000 * 60 * 15;

    return token;
  } catch (e) {
    console.error("Ошибка обновления токена", e);
    return token;
  }
}

export { handler as GET, handler as POST };
