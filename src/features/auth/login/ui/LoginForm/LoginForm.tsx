import { FC, ReactNode, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack, TextField } from "@mui/material";
import Cookies from "js-cookie";
import { z } from "zod";

import { getHomePage } from "@/shared/model";
import { UIStatus } from "@/shared/types";
import { PasswordField, PrivacyPolicyLink } from "@/shared/ui";
import { InputErrorText } from "@/shared/ui/InputErrorText";

import { getUserDeviceInfo } from "@/entities/user";

type Props = {
  setStatus?: (status: UIStatus) => void;
  isActive?: boolean;
  oauth?: ReactNode;
};

export const LoginForm: FC<Props> = ({ setStatus, isActive, oauth }) => {
  const router = useRouter();
  const t = useTranslations("features.auth.login.LoginForm");

  const LoginFormSchema = z.object({
    email: z.email(t("email.validation.wrong")).nonempty(t("email.validation.required")),
    password: z
      .string()
      .trim()
      .min(8, t("password.validation.minChar"))
      .max(16, t("password.validation.maxChar"))
      .nonempty(t("password.validation.required")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<z.infer<typeof LoginFormSchema>> = async (body) => {
    setStatus?.("loading");
    Cookies.set("deviceInfo", JSON.stringify(getUserDeviceInfo()), {
      expires: 1 / 24,
    });
    const { email, password } = body;
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.status === 200) {
      setStatus?.("success");
      router.push(getHomePage());
    } else {
      setStatus?.("error");
      console.log("Login error");
      toast.error("Login error!");
      reset();
    }
  };

  useEffect(() => {
    if (!isActive) {
      reset();
    }
  }, [isActive, reset]);

  return (
    <Stack component={"form"} onSubmit={handleSubmit(onSubmit)} gap={"1.2rem"}>
      <Stack>
        <TextField
          placeholder={t("email.label")}
          {...register("email")}
          fullWidth
          error={!!errors.email}
          helperText={<InputErrorText>{errors?.email?.message}</InputErrorText>}
        />
      </Stack>
      <PasswordField
        placeholder={t("password.label")}
        {...register("password")}
        fullWidth
        error={!!errors.password}
        helperText={<InputErrorText>{errors?.password?.message}</InputErrorText>}
      />
      <PrivacyPolicyLink />
      {oauth}
      <Button type={"submit"} variant={"contained"}>
        {t("submit_button")}
      </Button>
    </Stack>
  );
};
