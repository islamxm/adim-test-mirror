// "use server";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import Google from "next-auth/providers/google";

// import { cookies } from "next/headers";

import { Payload_LoginSchema, Response_LoginSchema } from "./contracts";
import {
  AuthErrorDeviceLimit,
  AuthErrorFetchRequest,
  AuthErrorFetchResponse,
  AuthErrorInvalidInputData,
  AuthErrorInvalidOutputData,
} from "./model";

export const authConfig = NextAuth({
  providers: [
    // login: google
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    // login: email/password
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
          };
        } catch (err) {
          console.error(`[${new AuthErrorInvalidOutputData().code}]: `, err);
          throw new AuthErrorInvalidOutputData();
        }
      },
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
            if (res.ok && data) {
              // (await cookies()).set("refresh_token", data.refreshToken, {
              //   httpOnly: true,
              // });
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
        // if (account?.type === "oauth") {
        //   const id_token = account?.id_token;
        //   const deviceInfo = JSON.parse((await cookies()).get("deviceInfo")?.value || "");
        //   if (id_token && deviceInfo) {
        //     try {
        //       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}users/google_sign_in`, {
        //         method: "POST",
        //         headers: {
        //           "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({
        //           token: id_token,
        //           deviceInfo,
        //         }),
        //       });

        //       if (res.status === 200) {
        //         const resBody = (await res.json()) as any;
        //         token.accessToken = resBody.accessToken;
        //         token.refreshToken = resBody.refreshToken;
        //         token.error = false;
        //         (await cookies()).set("refresh_token", resBody.refreshToken, {
        //           httpOnly: true,
        //         });
        //       } else {
        //         token.accessToken = undefined;
        //         token.refreshToken = undefined;
        //         token.error = true;
        //       }
        //     } catch (err) {
        //       token.accessToken = undefined;
        //       token.refreshToken = undefined;
        //       token.error = true;
        //       // throw err;
        //     }
        //   }
        // }
        if (account?.type === "credentials") {
          token.accessToken = (user as any)?.accessToken;
          token.refreshToken = (user as any)?.refreshToken;
        }
      }
      // значит пытаемся обновить данные (refresh token)
      if (trigger === "update" && session) {
        token.accessToken = (session as any)?.accessToken;
        token.refreshToken = (session as any)?.refreshToken;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken as string;
        session.refreshToken = token.refreshToken as string;
      }
      return session;
    },
  },
});

// export const getAuthOptions = (cookies: () => Promise<ReadonlyRequestCookies>): NextAuthConfig => {
//   return {
//     // debug: true,
//     providers: [
//       GoogleProvider({
//         clientId: process.env.GOOGLE_CLIENT_ID || "",
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
//       }),
//       CredentialsProvider({
//         id: "refresh-token-provider",
//         name: "refresh-token-provider",
//         credentials: {
//           accessToken: { label: "accessToken", type: "text" },
//         },
//         // @ts-ignore
//         async authorize(credentials) {
//           return {
//             accessToken: credentials?.accessToken,
//           };
//         },
//       }),
//       CredentialsProvider({
//         id: "email-verification",
//         name: "Email Verification",
//         credentials: {
//           token: { label: "token", type: "text" },
//         },
//         // @ts-ignore
//         async authorize(credentials) {
//           if (credentials?.token) {
//             try {
//               const res = await fetch(
//                 `${process.env.NEXT_PUBLIC_API_URL}verify?token=${credentials?.token}`,
//                 {
//                   method: "GET",
//                 },
//               );
//               const data = (await res.json()) as any;
//               console.log("TOKEN: ", credentials.token);
//               console.log(res);
//               if (res.ok && data) {
//                 (await cookies()).set("refresh_token", data.refreshToken, {
//                   httpOnly: true,
//                 });
//                 return {
//                   accessToken: data.accessToken,
//                   refreshToken: data.refreshToken,
//                   error: false,
//                 };
//               } else {
//                 console.log("BACKEND ERROR");
//               }
//               return null;
//             } catch (err) {
//               console.log("Verify error", err);
//               throw err;
//             }
//           }
//         },
//       }),
//       CredentialsProvider({
//         id: "credentials",
//         name: "Credentials",
//         credentials: {
//           email: { label: "email", type: "text" },
//           password: { label: "password", type: "password" },
//         },
//         // @ts-ignore
//         async authorize(credentials) {
//           const deviceInfo = JSON.parse((await cookies()).get("deviceInfo")?.value || "");
//           const body = { deviceInfo, ...credentials };
//           try {
//             const validatedBody = Payload_LoginSchema.parse(body);
//             const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}users/login`, {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify(validatedBody),
//             });
//             const data = (await res.json()) as any;
//             if (res.ok && data) {
//               (await cookies()).set("refresh_token", data.refreshToken, {
//                 httpOnly: true,
//               });
//             }
//             return {
//               accessToken: data.accessToken,
//               refreshToken: data.refreshToken,
//               error: false,
//             };
//           } catch (err) {
//             throw err;
//           }
//         },
//       }),
//     ],
//     session: {
//       strategy: "jwt",
//     },
//     pages: {
//       signIn: "/auth?type=login",
//       error: "/auth?type=login",
//     },
//     callbacks: {
//       async jwt({ token, account, user }) {
//         if (account?.type === "oauth") {
//           const id_token = account?.id_token;
//           const deviceInfo = JSON.parse((await cookies()).get("deviceInfo")?.value || "");
//           if (id_token && deviceInfo) {
//             try {
//               const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}users/google_sign_in`, {
//                 method: "POST",
//                 headers: {
//                   "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                   token: id_token,
//                   deviceInfo,
//                 }),
//               });

//               if (res.status === 200) {
//                 const resBody = (await res.json()) as any;
//                 token.accessToken = resBody.accessToken;
//                 token.refreshToken = resBody.refreshToken;
//                 token.error = false;
//                 (await cookies()).set("refresh_token", resBody.refreshToken, {
//                   httpOnly: true,
//                 });
//               } else {
//                 token.accessToken = undefined;
//                 token.refreshToken = undefined;
//                 token.error = true;
//               }
//             } catch (err) {
//               token.accessToken = undefined;
//               token.refreshToken = undefined;
//               token.error = true;
//               // throw err;
//             }
//           }
//         }
//         if (account?.type === "credentials" && (user as any)?.accessToken) {
//           token.accessToken = (user as any)?.accessToken;
//         }
//         return token;
//       },
//       async session({ session, token }) {
//         session.accessToken = token.accessToken as string;
//         (session as any).error = token.error as boolean;
//         return session;
//       },
//     },
//   };
// };
