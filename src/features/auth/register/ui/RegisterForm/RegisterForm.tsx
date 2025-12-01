import { UIStatus } from "@/shared/types";
import { Button, Input, Stack, TextField } from "@mui/material";
import { FC, ReactNode, useEffect } from "react";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputErrorText } from "@/shared/ui/InputErrorText";

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
    message: "Parollar gabat gelmeli",
  });

type RegisterFormType = z.infer<typeof RegisterFormSchema>;

export const RegisterForm: FC<Props> = ({ setStatus, isActive, oauth }) => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterFormSchema),
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<RegisterFormType> = (body) => {
    console.log("register", body);
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
        placeholder="Name"
        {...register("name")}
        error={!!errors.email}
        helperText={<InputErrorText>{errors.email?.message}</InputErrorText>}
      />
      <TextField
        fullWidth
        placeholder="E-mail"
        {...register("email")}
        error={!!errors.name}
        helperText={<InputErrorText>{errors.name?.message}</InputErrorText>}
      />
      <TextField
        fullWidth
        placeholder="Password"
        {...register("password")}
        error={!!errors.password}
        helperText={<InputErrorText>{errors.password?.message}</InputErrorText>}
      />
      <TextField
        fullWidth
        placeholder="Repeat password"
        {...register("repeatPassword")}
        error={!!errors.repeatPassword}
        helperText={
          <InputErrorText>{errors?.repeatPassword?.message}</InputErrorText>
        }
      />
      {oauth}
      <Button variant={"contained"} color={"primary"} type="submit">
        Continue
      </Button>
    </Stack>
  );
};
