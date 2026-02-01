import { FC, ReactNode, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack, TextField } from "@mui/material";
import { z } from "zod";

import { objectToSearchParams } from "@/shared/lib";
import { UIStatus } from "@/shared/types";
import { PasswordField, PrivacyPolicyLink } from "@/shared/ui";
import { InputErrorText } from "@/shared/ui/InputErrorText";

import { getUserDeviceInfo } from "@/entities/user";

import { registerApi } from "../../api";

type Props = {
  setStatus?: (status: UIStatus) => void;
  isActive?: boolean;
  oauth?: ReactNode;
};

export const RegisterForm: FC<Props> = ({ setStatus, isActive, oauth }) => {
  const t = useTranslations("features.auth.register.RegisterForm");
  const router = useRouter();
  const RegisterFormSchema = z
    .object({
      name: z
        .string()
        .trim()
        .min(2, t("name.validation.minChar"))
        .nonempty(t("name.validation.required"))
        .max(30, t("name.validation.maxChar")),
      password: z
        .string()
        .trim()
        .min(8, t("password.validation.minChar"))
        .nonempty(t("password.validation.required"))
        .max(16, t("password.validation.maxChar")),
      repeatPassword: z
        .string()
        .trim()
        .min(8, t("repeat_name.validation.minChar"))
        .max(16, t("repeat_name.validation.maxChar"))
        .nonempty(t("repeat_name.validation.required")),
      email: z.email(t("email.validation.wrong")).nonempty(t("email.validation.required")),
    })
    .refine((data) => data.password === data.repeatPassword, {
      message: t("repeat_name.validation.compare"),
      path: ["repeatPassword"],
    });
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    mode: "onSubmit",
  });
  const [signup] = registerApi.useRegisterMutation();

  const onSubmit: SubmitHandler<z.infer<typeof RegisterFormSchema>> = async (body) => {
    setStatus?.("loading");
    const { email, password, name: profileName } = body;
    const deviceInfo = getUserDeviceInfo();
    try {
      await signup({
        deviceInfo,
        email,
        password,
        profileName,
      }).unwrap();
      setStatus?.("success");
      router.push("/auth/verify" + objectToSearchParams({ email }));
    } catch (err) {
      setStatus?.("error");
      console.log("Signup error:", err);
      toast.error("Signup error!");
    }
  };

  useEffect(() => {
    if (!isActive) {
      reset();
    }
  }, [reset, isActive]);

  return (
    <Stack component={"form"} onSubmit={handleSubmit(onSubmit)} gap={"1.2rem"}>
      <TextField
        fullWidth
        placeholder={t("name.label")}
        {...register("name")}
        error={!!errors.name}
        helperText={<InputErrorText>{errors.name?.message}</InputErrorText>}
      />
      <TextField
        fullWidth
        placeholder={t("email.label")}
        {...register("email")}
        error={!!errors.email}
        helperText={<InputErrorText>{errors.email?.message}</InputErrorText>}
      />
      <PasswordField
        fullWidth
        placeholder={t("password.label")}
        {...register("password")}
        error={!!errors.password}
        type={"password"}
        helperText={<InputErrorText>{errors.password?.message}</InputErrorText>}
      />
      <PasswordField
        fullWidth
        placeholder={t("repeat_password.label")}
        {...register("repeatPassword")}
        error={!!errors.repeatPassword}
        type={"password"}
        helperText={<InputErrorText>{errors?.repeatPassword?.message}</InputErrorText>}
      />
      {errors.root?.message}
      <PrivacyPolicyLink />
      {oauth}
      <Button variant={"contained"} color={"primary"} type="submit">
        {t("submit_button")}
      </Button>
    </Stack>
  );
};
