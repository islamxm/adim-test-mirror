import { FC, ReactNode, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack, TextField } from "@mui/material";
import Cookies from "js-cookie";
import { z } from "zod";

import { getHomePage } from "@/shared/model";
import { UIStatus } from "@/shared/types";
import { InputErrorText } from "@/shared/ui/InputErrorText";

import { getUserDeviceInfo } from "@/entities/user";

type Props = {
  setStatus?: (status: UIStatus) => void;
  isActive?: boolean;
  oauth?: ReactNode;
};

const LoginFormSchema = z.object({
  email: z.email("Ýalňyş e-mail salgysy"),
  password: z
    .string()
    .min(5, "Parol azyndan 8 simwoldan ybarat bolmaly")
    .max(16, "Parol 16 simwoldan köp bolmaly däl"),
});

type LoginFormType = z.infer<typeof LoginFormSchema>;

export const LoginForm: FC<Props> = ({ setStatus, isActive, oauth }) => {
  const router = useRouter();
  const t = useTranslations("features.auth.login.LoginForm");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<LoginFormType> = async (body) => {
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
          placeholder={t("email")}
          {...register("email")}
          fullWidth
          error={!!errors.email}
          helperText={<InputErrorText>{errors?.email?.message}</InputErrorText>}
        />
      </Stack>
      <TextField
        placeholder={t("password")}
        {...register("password")}
        fullWidth
        type="password"
        error={!!errors.password}
        helperText={<InputErrorText>{errors?.password?.message}</InputErrorText>}
      />
      {oauth}
      <Button type={"submit"} variant={"contained"}>
        {t("submit_button")}
      </Button>
    </Stack>
  );
};
