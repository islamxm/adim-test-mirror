import { AuthOptions } from 'next-auth'
import { JWT } from 'next-auth/jwt';
import GoogleProvider from 'next-auth/providers/google'

export const authConfig: AuthOptions = {
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
  // 3) CALLBACKS — тут мы обрабатываем логин, рефреш токена, сессию
  callbacks: {
    // a) JWT callback — вызывается при логине, обновлении токена и тд.
    async jwt({ token, user, account }): Promise<JWT> {
      // --- Если логин впервые ---
      if (account && user) {
        try {
          const ck = await cookies();
          const deviceInfo = JSON.parse(ck.get("deviceInfo")?.value || "");
          
          const body = {
            token: account.id_token,
            deviceInfo,
          };

          console.log(body)
          
          const res = await fetch(
            "http://193.47.42.164:13000/api/v1/users/google_sign_in",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
            }
          );
          console.log(await res.text());
          if (!res.ok) {
            throw new Error("BackendAuthFailed");
          }
          const data = await res.json();
          token.accessToken = data.data.accessToken;
          token.refreshToken = data.data.refreshToken;
          token.userId = data.data.userId;
          token.deviceId = data.data.deviceId;

          // 3. Устанавливаем таймер для обновления токена
          token.accessTokenExpires = Date.now() + 1000 * 60 * 15; // +15 минут
          return token;
        } catch (err) {
          throw err;
        }
      }

      // --- Если токен просрочен — обновляем ---
      if (Date.now() > (token.accessTokenExpires as number)) {
        console.log("🔄 Refreshing token...");
        // return await refreshBackendToken(token);
      }

      return token;
    },

    // b) session callback — добавляем токены в объект сессии для клиента
    async session({ session, token }) {
      // @ts-ignore
      session.user.id = token.userId;
      (session as any).accessToken = token.accessToken;
      (session as any).refreshToken = token.refreshToken;
      return session;
    },
  },
}