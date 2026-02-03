"use client";
import { FC, PropsWithChildren, useEffect } from "react";

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
      router.refresh();
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

  useEffect(() => {
    dispatch(userSlice.actions.updateAuthStatus(status));
    if (status !== "loading") {
      dispatch(
        userSlice.actions.updateTokens({
          accessToken: data?.accessToken ?? undefined,
          refreshToken: data?.refreshToken ?? undefined,
        }),
      );
    }
  }, [data?.accessToken, data?.refreshToken, status, dispatch]);

  // useEffect(() => {
  //   if (
  //     accessToken &&
  //     refreshToken &&
  //     (data?.accessToken !== accessToken || data?.refreshToken !== refreshToken)
  //   ) {
  //     update({ accessToken, refreshToken });
  //   }
  // }, [accessToken, refreshToken, update, data]);

  return <>{children}</>;
};
