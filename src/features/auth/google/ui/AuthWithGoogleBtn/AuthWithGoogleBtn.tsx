import { FC } from "react";
import { toast } from "react-toastify";

import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { Button } from "@mui/material";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

import { useRouterProgress } from "@/shared/lib";
import { getProfilePage } from "@/shared/model";
import { UIStatus } from "@/shared/types";

import { getUserDeviceInfo } from "@/entities/user";
import { AuthGoogleError } from "@/entities/user";

import googleIcon from "../../../../../../public/google.png";
import classes from "./classes.module.scss";

type Props = {
  setStatus?: (status: UIStatus) => void;
};

export const AuthWithGoogleBtn: FC<Props> = ({ setStatus }) => {
  const router = useRouterProgress();
  const t = useTranslations("features.auth.google.AuthWithGoogleBtn");

  const onGoogleSuccess = async (response: CredentialResponse) => {
    try {
      setStatus?.("loading");
      const token = response?.credential;

      if (!token) {
        throw new AuthGoogleError();
      }
      const deviceInfo = JSON.stringify(getUserDeviceInfo());
      const payload = {
        deviceInfo,
        token,
      };
      const res = await signIn("google-signup", {
        ...payload,
        redirect: false,
      });
      if (!res || res?.code === new AuthGoogleError().code) {
        throw new AuthGoogleError();
      }
      router.replace(getProfilePage());
    } catch (err) {
      toast.error(t("errors.default"));
      setStatus?.("error");
    }
  };

  return (
    <Button
      sx={{ p: 0 }}
      fullWidth
      variant={"contained"}
      color={"secondary"}
      className={classes.button}
      type="button"
      startIcon={<Image src={googleIcon.src} alt="Google" width={20} height={20} />}
    >
      {t("text")}
      <GoogleLogin ux_mode={"popup"} onSuccess={onGoogleSuccess} theme={"outline"} />
    </Button>
  );
};
