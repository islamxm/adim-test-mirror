import { FC, useEffect } from "react";
import { toast } from "react-toastify";

import { signIn, signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { Button } from "@mui/material";
import Cookies from "js-cookie";

import { useRouterProgress } from "@/shared/lib";
import { getHomePage } from "@/shared/model";
import { UIStatus } from "@/shared/types";

import { getUserDeviceInfo } from "@/entities/user";

import googleIcon from "../../../../../../public/google.png";

type Props = {
  setStatus?: (status: UIStatus) => void;
};

export const AuthWithGoogleBtn: FC<Props> = ({ setStatus }) => {
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
    setStatus?.("success");
  };

  useEffect(() => {
    if (status === "loading") {
      setStatus?.("loading");
    } else {
      if (data) {
        if ((data as any)?.error) {
          console.error("Backend Error");
          toast.error("Google sign in error!", { autoClose: 3000 });
          signOut({ redirect: false });
        } else {
          router.replace(getHomePage());
        }
      }
      setStatus?.("success");
    }
  }, [status, data, setStatus]);

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
