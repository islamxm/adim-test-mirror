"use client";
import { FC, PropsWithChildren, useEffect, useRef } from "react";

import { useSession } from "next-auth/react";

import { useDispatch, useRouterProgress, useSelector } from "@/shared/lib";

import { userSlice } from "@/entities/user";

/** для проверки авторизации в приватных роутах */
export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { status } = useSession();
  const router = useRouterProgress();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userSlice.actions.updateAuthStatus(status));
    if (status === "unauthenticated") {
      router.push("/auth?type=login");
    }
  }, [status, dispatch, router]);

  // при loading можно показать спиннер
  return <>{children}</>;
};

/** получение токена в начале и сохранение в сторе чтобы не делать лишние запросы перед каждым фетчем */
export const AuthInitializer: FC<PropsWithChildren> = ({ children }) => {
  const { data, status, update } = useSession();
  const dispatch = useDispatch();
  const { accessToken, refreshToken } = useSelector((s) => s.user);
  const isJWTUpdating = useRef<boolean>(false);
  const lastSentToken = useRef<string | null>(null);
  const timer = useRef<any>(null);

  // это при авторизации
  useEffect(() => {
    dispatch(userSlice.actions.updateAuthStatus(status));
    if (status === "authenticated" && data?.accessToken && data?.refreshToken) {
      dispatch(
        userSlice.actions.updateTokens({
          accessToken: data?.accessToken ?? undefined,
          refreshToken: data?.refreshToken ?? undefined,
        }),
      );
    }
  }, [data?.accessToken, data?.refreshToken, status, dispatch, data?.id_token]);

  // при ручном изменении токена в api (refresh) обновляем jwt
  useEffect(() => {
    if (status !== "authenticated" || !accessToken || !refreshToken) return;
    const isDifferent = accessToken !== data?.accessToken;
    if (isDifferent && !isJWTUpdating.current && accessToken !== lastSentToken.current) {
      isJWTUpdating.current = true;
      lastSentToken.current = accessToken;
      update({ accessToken, refreshToken })
        .then(() => console.log("Success session sync"))
        .catch(() => {
          console.error("Error session sync");
          lastSentToken.current = null;
        })
        .finally(() => {
          if (timer.current) {
            clearTimeout(timer.current);
            timer.current = null;
          }
          timer.current = setTimeout(() => {
            isJWTUpdating.current = false;
          }, 500);
        });
    }

    return () => {
      clearTimeout(timer.current);
      timer.current = null;
    };
  }, [accessToken, refreshToken, update, data, status]);

  return <>{children}</>;
};
