import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

import { getLoginPage } from "@/shared/model";

import { Payload_LoginSchema } from "./contracts";

export const getAuthOptions = (cookies: () => Promise<ReadonlyRequestCookies>): AuthOptions => {
  return {
    // debug: true,
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
      CredentialsProvider({
        id: "email-verification",
        name: "Email Verification",
        credentials: {
          token: { label: "token", type: "text" },
        },
        // @ts-ignore
        async authorize(credentials) {
          if (credentials?.token) {
            try {
              const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}verify?token=${credentials?.token}`,
                {
                  method: "GET",
                },
              );
              const data = (await res.json()) as any;
              console.log("TOKEN: ", credentials.token);
              console.log(res);
              if (res.ok && data) {
                (await cookies()).set("refresh_token", data.refreshToken, {
                  httpOnly: true,
                });
                return {
                  accessToken: data.accessToken,
                  refreshToken: data.refreshToken,
                  error: false,
                };
              } else {
                console.log("BACKEND ERROR");
              }
              return null;
            } catch (err) {
              console.log("Verify error", err);
              throw err;
            }
          }
        },
      }),
      CredentialsProvider({
        id: "credentials",
        name: "Credentials",
        credentials: {
          email: { label: "email", type: "text" },
          password: { label: "password", type: "password" },
        },
        // @ts-ignore
        async authorize(credentials) {
          const deviceInfo = JSON.parse((await cookies()).get("deviceInfo")?.value || "");
          const body = { deviceInfo, ...credentials };
          try {
            const validatedBody = Payload_LoginSchema.parse(body);
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}users/login`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(validatedBody),
            });
            const data = (await res.json()) as any;

            if (res.ok && data) {
              (await cookies()).set("refresh_token", data.refreshToken, {
                httpOnly: true,
              });
            }
            return {
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
              error: false,
            };
          } catch (err) {
            throw err;
          }
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
