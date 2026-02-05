import { FC, ReactNode, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack, TextField } from "@mui/material";
import { z } from "zod";

import { getHomePage } from "@/shared/model";
import { UIStatus } from "@/shared/types";
import { PasswordField } from "@/shared/ui";
import { InputErrorText } from "@/shared/ui/InputErrorText";

import { getUserDeviceInfo } from "@/entities/user";
import { AuthErrorDeviceLimit } from "@/entities/user/model";
import { PrivacyPolicyLink } from "@/entities/user/ui/PrivacyPolicyLink/PrivacyPolicyLink";

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
    const deviceInfo = JSON.stringify(getUserDeviceInfo());
    const { email, password } = body;
    const res = await signIn("credentials", {
      email,
      password,
      deviceInfo,
      redirect: false,
    });
    if (res.url) {
      // баг в next-auth, он просто приклеивает сверху свой ?error не учитывая то что там может быть наше поле
      const url = new URL(res.url.replace(/\?([^?]*)\?/, "?$1&"));
      const error = url.searchParams.get("error");
      const errorCode = url.searchParams.get("code");

      if (error) {
        setStatus?.("error");
        if (errorCode === new AuthErrorDeviceLimit().code) {
          toast.error("You have reached the maximum number of devices!");
        } else {
          toast.error("Log in error!");
        }
        reset();
        return;
      }
    }
    if (res.ok) {
      setStatus?.("success");
      router.push(getHomePage());
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
      <Button type={"submit"} variant={"contained"}>
        {t("submit_button")}
      </Button>
      {oauth}
    </Stack>
  );
};
