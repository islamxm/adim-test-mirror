import { Button } from "@mui/material";
import googleIcon from "../../../../../../public/google.png";
import Image from "next/image";
import { FC, useEffect } from "react";
import { getUserDeviceInfo } from "@/entities/user";
import Cookies from "js-cookie";
import { signIn, useSession, signOut } from "next-auth/react";
import { UIStatus } from "@/shared/types";
import { redirect } from "next/navigation";

type Props = {
  setStatus?: (status: UIStatus) => void;
};

export const AuthWithGoogleBtn: FC<Props> = ({ setStatus }) => {
  const { data, status } = useSession();

  const onSubmit = async () => {
    setStatus?.("loading");
    Cookies.set("deviceInfo", JSON.stringify(getUserDeviceInfo()), {
      expires: 1 / 24,
    });
    await signIn("google", {
      callbackUrl: "/auth",
    });
    setStatus?.("success");
  };

  useEffect(() => {
    if (status === "loading") {
      setStatus?.("loading");
    } else {
      if (data) {
        if ((data as any)?.error) {
          console.error("Backend Error");
        } else {
          redirect('/home')
        }
      }
      setStatus?.("success");
    }
  }, [status, data, setStatus]);

  return (
    <>
      <Button
        startIcon={
          <Image src={googleIcon.src} alt="Google" width={20} height={20} />
        }
        variant={"contained"}
        color={"secondary"}
        onClick={onSubmit}
      >
        Continue with google
      </Button>
      <Button onClick={() => signOut()}>Sign out</Button>
    </>
  );
};
