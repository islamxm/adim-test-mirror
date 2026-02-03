import { FC, useEffect } from "react";
import { toast } from "react-toastify";

import { signIn, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { Button } from "@mui/material";
import Cookies from "js-cookie";

import { UIStatus } from "@/shared/types";

import { getUserDeviceInfo, userSlice } from "@/entities/user";

import googleIcon from "../../../../../../public/google.png";

type Props = {
  setStatus?: (status: UIStatus) => void;
};

export const AuthWithGoogleBtn: FC<Props> = ({ setStatus }) => {
  const { data } = useSession();
  const t = useTranslations("features.auth.google.AuthWithGoogleBtn");

  const onSubmit = async () => {
    setStatus?.("loading");
    Cookies.set("deviceInfo", JSON.stringify(getUserDeviceInfo()), {
      expires: 1 / 24,
    });
    try {
      await signIn("google");
      setStatus?.("success");
    } catch (e) {
      toast.error("Google sign in error!");
      setStatus?.("error");
    }
  };

  useEffect(() => {
    if (data?.error) {
      toast.error("Google sign in error!");
    }
  }, [data]);

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
