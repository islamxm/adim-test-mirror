"use client";
import { useEffect } from "react";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { getHomePage } from "@/shared/model";

import { VerifyPage as VerifyPageComponent } from "@/_pages/verifyPage";

export default function VerifyPage() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token");

  useEffect(() => {
    if (token) {
      signIn("email-verification", {
        token,
        redirect: false,
      }).then((res) => {
        if (res?.ok) {
          router.push(getHomePage());
        } else {
          console.log("Verify error");
        }
      });
    }
  }, [token, router]);

  if (!token) {
    return <VerifyPageComponent />;
  }
}
