"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { getDeviceInfo } from "@/shared/lib";
import { getProfilePage } from "@/shared/model";

import { VerificationError } from "@/entities/user/model";

import { VerifyPage as VerifyPageComponent } from "@/_pages/verifyPage";

export default function VerifyPage() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token");
  const email = params.get("email");
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (token) {
      setIsVerifying(true);
      const verify = async () => {
        const deviceInfo = JSON.stringify(getDeviceInfo());
        const res = await signIn("email-verification", {
          token,
          deviceInfo,
          redirect: false,
        });
        console.log(res);
        if (!res.ok || res?.error) {
          toast.error("Verification error!");
        } else {
          router.push(getProfilePage());
        }
        setIsVerifying(false);
      };
      verify();
    }
  }, [token, router]);

  return <VerifyPageComponent isVeryfiyng={isVerifying} email={email} />;
}
