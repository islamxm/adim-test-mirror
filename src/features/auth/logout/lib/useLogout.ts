import { useCallback, useState } from "react";
import { toast } from "react-toastify";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import { getLoginPage } from "@/shared/model";

export const useLogout = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await signOut({ redirect: false });
      router.push(getLoginPage());
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Не удалось выйти с аккаунта!");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  return {
    logout,
    isLoading,
  };
};
