import { FC, useEffect } from "react";
import { toast } from "react-toastify";

import { signIn, signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { Button } from "@mui/material";
import Cookies from "js-cookie";

import { useDispatch, useRouterProgress, useSelector } from "@/shared/lib";
import { getProfilePage } from "@/shared/model";
import { UIStatus } from "@/shared/types";

import { getUserDeviceInfo, userSlice } from "@/entities/user";

import googleIcon from "../../../../../../public/google.png";

type Props = {
  setStatus?: (status: UIStatus) => void;
};

export const AuthWithGoogleBtn: FC<Props> = ({ setStatus }) => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((s) => s.user);
  const router = useRouterProgress();
  const { data, status } = useSession();
  const t = useTranslations("features.auth.google.AuthWithGoogleBtn");
  const onSubmit = async () => {
    setStatus?.("loading");
    Cookies.set("deviceInfo", JSON.stringify(getUserDeviceInfo()), {
      expires: 1 / 24,
    });
    try {
      await signIn("google");
    } catch (e) {
      toast.error("Google sign in error!");
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      const googleAuth = data?.id_token && !data?.accessToken && !accessToken;
      if (googleAuth) {
        setStatus?.("loading");
        fetch("/api/auth/google-sync", { method: "POST" }).then((res) => {
          if (res.ok) {
            res.json().then(({ accessToken, refreshToken }) => {
              dispatch(
                userSlice.actions.updateTokens({
                  accessToken,
                  refreshToken,
                }),
              );
              setStatus?.("success");
              router.push(getProfilePage());
            });
          } else {
            setStatus?.("error");
            console.error("Backend google error");
            signOut({ redirect: false });
          }
        });
      } else {
        setStatus?.("error");
      }
    }
  }, [status, dispatch, data, setStatus, accessToken, router]);

  return (
    <Button
      startIcon={<Image src={googleIcon.src} alt="Google" width={20} height={20} />}
      variant={"contained"}
      color={"secondary"}
      onClick={onSubmit}
      type="button"
    >
      {t("text")}
    </Button>
  );
};
