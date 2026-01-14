import { FC, ReactNode, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack, TextField } from "@mui/material";
import { z } from "zod";

import { objectToSearchParams } from "@/shared/lib";
import { UIStatus } from "@/shared/types";
import { InputErrorText } from "@/shared/ui/InputErrorText";

import { getUserDeviceInfo } from "@/entities/user";

import { registerApi } from "../../api";

type Props = {
  setStatus?: (status: UIStatus) => void;
  isActive?: boolean;
  oauth?: ReactNode;
};

const RegisterFormSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters long")
      .max(30, "Name must be at most 30 characters long"),
    password: z
      .string()
      .min(5, "Password must be at least 5 characters long")
      .max(16, "Password must be at most 16 characters long"),
    repeatPassword: z
      .string()
      .min(5, "Password must be at least 5 characters long")
      .max(16, "Password must be at most 16 characters long"),
    email: z.email("Uncorrect email"),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Пароли должны совпадать",
    path: ["repeatPassword"],
  });

type RegisterFormType = z.infer<typeof RegisterFormSchema>;

export const RegisterForm: FC<Props> = ({ setStatus, isActive, oauth }) => {
  const t = useTranslations("features.auth.register.RegisterForm");
  const router = useRouter();
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterFormSchema),
    mode: "onSubmit",
  });
  const [signup] = registerApi.useRegisterMutation();

  const onSubmit: SubmitHandler<RegisterFormType> = async (body) => {
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
        placeholder={t("name")}
        {...register("name")}
        error={!!errors.name}
        helperText={<InputErrorText>{errors.name?.message}</InputErrorText>}
      />
      <TextField
        fullWidth
        placeholder={t("email")}
        {...register("email")}
        error={!!errors.email}
        helperText={<InputErrorText>{errors.email?.message}</InputErrorText>}
      />
      <TextField
        fullWidth
        placeholder={t("password")}
        {...register("password")}
        error={!!errors.password}
        type={"password"}
        helperText={<InputErrorText>{errors.password?.message}</InputErrorText>}
      />
      <TextField
        fullWidth
        placeholder={t("repeat_password")}
        {...register("repeatPassword")}
        error={!!errors.repeatPassword}
        type={"password"}
        helperText={<InputErrorText>{errors?.repeatPassword?.message}</InputErrorText>}
      />
      {errors.root?.message}
      {oauth}
      <Button variant={"contained"} color={"primary"} type="submit">
        {t("submit_button")}
      </Button>
    </Stack>
  );
};
