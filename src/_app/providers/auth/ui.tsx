"use client";
import { FC, PropsWithChildren, useEffect } from "react";

import { useSession } from "next-auth/react";

import { useDispatch, useRouterProgress } from "@/shared/lib";

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
      router.refresh();
    }
  }, [status, dispatch, router]);

  // при loading можно показать спиннер
  return <>{children}</>;
};

/** получение токена в начале и сохранение в сторе чтобы не делать лишние запросы перед каждым фетчем */
export const AuthInitializer: FC<PropsWithChildren> = ({ children }) => {
  const { data, status } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status !== "loading") {
      dispatch(userSlice.actions.updateAccessToken(data?.accessToken ?? undefined));
    }
  }, [data, status, dispatch]);

  return <>{children}</>;
};
