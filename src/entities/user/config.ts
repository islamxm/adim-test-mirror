import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

import { getLoginPage } from "@/shared/model";

export const getAuthOptions = (cookies: () => Promise<ReadonlyRequestCookies>): AuthOptions => {
  return {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      }),
      CredentialsProvider({
        id: "refresh-token-provider",
        name: "refresh-token-provider",
        credentials: {
          accessToken: { label: "accessToken", type: "text" },
        },
        // @ts-ignore
        async authorize(credentials) {
          return {
            accessToken: credentials?.accessToken,
          };
        },
      }),
    ],
    session: {
      strategy: "jwt",
    },
    pages: {
      signIn: getLoginPage(),
      error: "/auth?type=login",
    },
    callbacks: {
      async jwt({ token, account, user }) {
        if (account?.type === "oauth") {
          const id_token = account?.id_token;
          const deviceInfo = JSON.parse((await cookies()).get("deviceInfo")?.value || "");
          if (id_token && deviceInfo) {
            try {
              const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}users/google_sign_in`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  token: id_token,
                  deviceInfo,
                }),
              });
              if (res.status === 200) {
                const resBody = (await res.json()) as any;
                token.accessToken = resBody.accessToken;
                token.refreshToken = resBody.refreshToken;
                token.error = false;
                (await cookies()).set("refresh_token", resBody.refreshToken, {
                  httpOnly: true,
                });
              } else {
                token.accessToken = undefined;
                token.refreshToken = undefined;
                token.error = true;
              }
            } catch (err) {
              throw err;
            }
          }
        }
        if (account?.type === "credentials" && (user as any)?.accessToken) {
          token.accessToken = (user as any)?.accessToken;
        }
        return token;
      },
      async session({ session, token }) {
        session.accessToken = token.accessToken as string;
        (session as any).error = token.error as boolean;
        return session;
      },
    },
  };
};
