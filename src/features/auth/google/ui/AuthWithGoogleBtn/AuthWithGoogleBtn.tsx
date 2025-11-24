import { Button } from "@mui/material";
import googleIcon from "../../../../../../public/google.png";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getUserDeviceInfo } from "@/entities/user";
import Cookies from "js-cookie";

export const AuthWithGoogleBtn = () => {
  const params = useSearchParams();
  const error = params?.get("error");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    Cookies.set("deviceInfo", JSON.stringify(getUserDeviceInfo()), {
      expires: 1 / 24,
    });
    await signIn("google", {
      prompt: "login",
    });

    setLoading(false);
  };

  useEffect(() => {
    if (error) {
      console.error("Authorization error!");
    }
  }, [error]);

  return (
    <Button
      startIcon={
        <Image src={googleIcon.src} alt="Google" width={20} height={20} />
      }
      variant={"contained"}
      color={"secondary"}
      onClick={onSubmit}
      loading={loading}
    >
      Continue with google
    </Button>
  );
};
