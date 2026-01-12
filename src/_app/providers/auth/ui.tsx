import { FC, PropsWithChildren, useEffect } from "react";

import { useAuth, useDispatch } from "@/shared/lib";

import { userSlice } from "@/entities/user";

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const isAuth = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userSlice.actions.updateAuthStatus(isAuth));
  }, [isAuth, dispatch]);

  return <>{children}</>;
};
