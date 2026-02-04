import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { jwtDecode } from "jwt-decode";

import { Payload_LoginSchema, Response_LoginSchema } from "./contracts";
import {
  AuthErrorDeviceLimit,
  AuthErrorFetchRequest,
  AuthErrorFetchResponse,
  AuthErrorInvalidInputData,
  AuthErrorInvalidOutputData,
  VerificationError,
} from "./model";

let globalRefreshPromise: Promise<any> | null = null;

const refreshAccessToken = async (token: any) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}users/generate_token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        deviceInfo: token?.deviceInfo,
        token: token?.refreshToken,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw data;
    }
    return {
      ...token,
      accessToken: data?.accessToken,
      refreshToken: data?.refreshToken,
      expire_date: (jwtDecode(data?.accessToken).exp as number) * 1000,
      error: false,
    };
  } catch (err) {
    console.log("Refresh Error: ", err);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
};

export const authConfig = NextAuth({
  debug: true,
  trustHost: true,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      id: "credentials",
      name: "User email & password login",
      //@ts-ignore
      async authorize(credentials) {
        let payload: any;
        try {
          const validatedPayload = Payload_LoginSchema.parse(credentials);
          payload = {
            email: validatedPayload.email,
            password: validatedPayload.password,
            deviceInfo: JSON.parse(validatedPayload.deviceInfo || ""),
          };
        } catch (err) {
          console.error(`[${new AuthErrorInvalidInputData().code}]: `, err);
          throw new AuthErrorInvalidInputData();
        }

        let res: Response;
        try {
          res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}users/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
        } catch (err) {
          console.error(`[${new AuthErrorFetchRequest().code}]: `, err);
          throw new AuthErrorFetchRequest();
        }

        let data: any;
        try {
          data = await res?.json();
          console.log("RES: ", data);
        } catch (err) {
          console.error(`[${new AuthErrorFetchResponse().code} / NOT_JSON]: `, err);
          throw new AuthErrorFetchResponse();
        }
        if (res.status === 403) {
          console.error(`[${new AuthErrorDeviceLimit().code}]`);
          throw new AuthErrorDeviceLimit();
        }
        if (res.status !== 200 && res.status !== 403) {
          console.error(`[${new AuthErrorFetchResponse().code}]`);
          throw new AuthErrorFetchResponse();
        }

        try {
          const validatedData = Response_LoginSchema.parse(data);
          return {
            id: "session",
            accessToken: validatedData.accessToken,
            refreshToken: validatedData.refreshToken,
            expire_date: (jwtDecode(validatedData.accessToken).exp as number) * 1000,
            deviceInfo: payload.deviceInfo,
          };
        } catch (err) {
          console.error(`[${new AuthErrorInvalidOutputData().code}]: `, err);
          throw new AuthErrorInvalidOutputData();
        }
      },
    }),
    CredentialsProvider({
      id: "email-verification",
      name: "Email Verification",
      // @ts-ignore
      async authorize(credentials) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}verify?token=${credentials?.token}`,
            {
              method: "GET",
            },
          );
          const data = (await res.json()) as any;
          if (!res.ok) {
            throw new VerificationError();
          }
          return {
            id: "session",
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            expire_date: (jwtDecode(data.accessToken).exp as number) * 1000,
            deviceInfo: JSON.parse(credentials.deviceInfo as string),
            error: false,
          };
        } catch (err) {
          throw new VerificationError();
          // return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth?type=login",
    error: "/auth?type=login",
  },
  callbacks: {
    async jwt({ token, account, user, trigger, session }) {
      //user - это то что я вернул из authorize
      //token - текущий зашифрованный обьект, то что лежит в куке
      //trigger - что был инициатором этого коллбэка
      //account - способ которым он произвел вход

      // значит юзер только что произвел вход
      if (user) {
        if (account?.provider === "google") {
          const id_token = account?.id_token;
          if (id_token) {
            try {
              const { cookies } = await import("next/headers");
              const cookieStore = await cookies();
              const rawDeviceInfo = cookieStore.get("deviceInfo")?.value;
              const deviceInfo = rawDeviceInfo ? JSON.parse(rawDeviceInfo) : {};
              const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}users/google_sign_in`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  token: id_token,
                  deviceInfo: deviceInfo,
                }),
              });
              const data = await res.json();
              if (!res.ok) {
                throw data;
              }
              token.accessToken = data.accessToken;
              token.refreshToken = data.refreshToken;
              token.expire_date = (jwtDecode(data.accessToken).exp as number) * 1000;
              token.deviceInfo = deviceInfo;
              token.error = false;
              return token;
            } catch (err) {
              console.log("Google sign in error: ", err);
              return {
                ...token,
                error: "GoogleSignInError",
              };
            }
          }
        }
        if (account?.type === "credentials") {
          token.accessToken = (user as any)?.accessToken;
          token.refreshToken = (user as any)?.refreshToken;
          token.expire_date = (user as any)?.expire_date;
          token.deviceInfo = (user as any)?.deviceInfo;
          token.error = false;
        }
        return token;
      }
      if (Date.now() < (token as any).expire_date - 60000) {
        return token;
      } else {
        if (!globalRefreshPromise) {
          globalRefreshPromise = refreshAccessToken(token).then((newToken) => {
            setTimeout(() => {
              globalRefreshPromise = null;
            }, 10000);
            return newToken;
          });
        }
        return globalRefreshPromise;
      }
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken as string;
        session.refreshToken = token.refreshToken as string;
        session.id_token = token.id_token as any;
        session.error = token.error as any;
      }
      return session;
    },
  },
});
