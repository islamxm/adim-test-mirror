import { UIStatus } from "@/shared/types";
import { Button, Stack, TextField } from "@mui/material";
import { FC, ReactNode, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputErrorText } from "@/shared/ui/InputErrorText";
import { useTranslations } from "next-intl";

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

  const onSubmit: SubmitHandler<LoginFormType> = (body) => {
    console.log("login", body);
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
        helperText={
          <InputErrorText>{errors?.password?.message}</InputErrorText>
        }
      />
      {oauth}
      <Button type={"submit"} variant={"contained"}>
        {t("submit_button")}
      </Button>
    </Stack>
  );
};
